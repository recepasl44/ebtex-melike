<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends APIController
{
    public function index()
    {
        /* -------------------------------------------------
         | Ortak veriler – tekrar eden sorguları bir kez çalıştır
         * ------------------------------------------------*/
        $now          = Carbon::now();
        $startOfWeek  = $now->copy()->startOfWeek();
        $endOfWeek    = $now->copy()->endOfWeek();
        $prevStart    = $now->copy()->subWeek()->startOfWeek();
        $prevEnd      = $now->copy()->subWeek()->endOfWeek();

        /* Basit sayımlar --------------------------------------------------- */
        $students     = DB::table('students')->count();
        $teachers     = DB::table('teachers')->count();
        $classes      = DB::table('classes')->count();
        $assignments  = DB::table('assignments')->count();

        /* -------------------------------------------------
         | 1 – Akademik & idari özet
         * ------------------------------------------------*/
        $registerTarget = $students + 20;           // iş hedefi
        $registerNumber = [
            'default' => $students,
            'target'  => $registerTarget,
            'rate'    => $students ? round(($students / $registerTarget) * 100, 2) . '%' : '0%',
        ];

        $classInformation = [
            'available' => $classes,
            'directory' => DB::table('branches')->value('name') ?? '',
            'advisor'   => DB::table('teachers')->value('name_surname') ?? '',
        ];

        $nextMeeting = DB::table('meetings')
            ->where('meeting_date', '>=', $now)
            ->orderBy('meeting_date')
            ->first();

        $directoryMessage = [
            'upcoming_meeting' => optional($nextMeeting)->meeting_date,
            'last_target'      => DB::table('tasks')->latest('task_to')->value('name'),
        ];

        $generalInformation = [
            'class'   => $classes,
            'student' => $students,
            'teacher' => $teachers,
        ];

        $thisWeekParents = DB::table('guardianmeetings')
            ->whereBetween('meeting_date', [$startOfWeek, $endOfWeek])
            ->count();

        $lastWeekParents = DB::table('guardianmeetings')
            ->whereBetween('meeting_date', [$prevStart, $prevEnd])
            ->count();

        $numberOfParentMeetings = [
            'last_week' => $lastWeekParents,
            'this_week' => $thisWeekParents,
            'season'    => DB::table('guardianmeetings')->count(),
        ];

        $dailyAttendanceMonitoring = [
            'class'            => DB::table('attendances')->count(),
            'lesson_learned'   => DB::table('attendanceteachers')->count(),
            'lesson_not_learned' => DB::table('attendancestudents')->count(),
        ];

        $numberOfClassrooms = DB::table('classrooms')
            ->select('name', DB::raw('COUNT(*) as total'))
            ->groupBy('name')
            ->get();

        $maleFemale = DB::table('students as s')
            ->join('programs as p', 's.program_id', '=', 'p.id')
            ->selectRaw(
                'p.name,
                 SUM(CASE WHEN s.gender_id = 2 THEN 1 END) as girl,
                 SUM(CASE WHEN s.gender_id = 1 THEN 1 END) as boy'
            )
            ->groupBy('p.name')
            ->get();

        $nextExam = DB::table('quizzes')
            ->whereNotNull('quiz_date')
            ->where('quiz_date', '>=', $now)
            ->orderBy('quiz_date')
            ->first();

        $examCountdown = $nextExam ? ['name' => $nextExam->name, 'date' => $nextExam->quiz_date] : null;

        $courseDistribution = DB::table('levels as l')
            ->leftJoin('courses as c', 'l.id', '=', 'c.level_id')
            ->select('l.name', DB::raw('COUNT(c.id) as consultancy'))
            ->groupBy('l.id')
            ->get();

        $courseAndClassInformation = [
            'class'         => $classes,
            'weekly_lesson' => (int) DB::table('lesson_programs')->sum('weekly_hourse'),
            'student'       => $students,
        ];

        $consultancy = DB::table('guidancemeetings as g')
            ->leftJoin('students as s', 'g.student_id', '=', 's.id')
            ->orderByDesc('g.meeting_date')
            ->selectRaw("
                g.guidance_name  as class,
                CONCAT(s.first_name,' ',s.last_name) as student,
                CONCAT(WEEK(g.meeting_date),'/Hafta') as meet
            ")
            ->first();

        $latestGuidance = DB::table('guidanceobservations')
            ->latest('created_at')
            ->first();

        $guidanceInfo = $latestGuidance ? [
            'discussed'     => $latestGuidance->title,
            'meeting_time'  => $latestGuidance->observation_date,
            'meeting_hour'  => $latestGuidance->observation_date,
            'status'        => $latestGuidance->status,
            'notes'         => $latestGuidance->description,
        ] : null;

        /* -------------------------------------------------
         | 2 – Finans
         * ------------------------------------------------*/
        $totalPayments = DB::table('payments')->sum('amount_paid');
        $totalExpenses = DB::table('expenses')->sum('amount');

        $installments       = DB::table('installments');
        $installmentTruck   = [
            'total'   => $installments->count(),
            'payed'   => $installments->where('is_paid', 1)->count(),
            'delayed' => $installments->where('is_paid', 0)->where('due_date', '<', $now)->count(), /* FIX */
        ];

        $cashSummary = [
            'total_income'  => $totalPayments,
            'total_expense' => $totalExpenses,
            'total_balance' => $totalPayments - $totalExpenses,
        ];

        $financeStatus = [
            'entity' => (float) DB::table('open_accounts')->sum('amount'),
            'debt'   => (float) DB::table('debts')->sum('amount'),
        ];
        $financeStatus['net'] = $financeStatus['entity'] - $financeStatus['debt'];

        // Aylık taksit durumu – yıl+ay bazında gruplanır, çakışma engellenir
        $mountyInstallmentStatus = DB::table('installments')
            ->selectRaw("
                DATE_FORMAT(due_date,'%Y-%m') as month,
                SUM(CASE WHEN is_paid = 1 THEN amount ELSE 0 END)  as paid,
                SUM(CASE WHEN is_paid <> 1 THEN amount ELSE 0 END) as un_paid
            ")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $paymentSuppliers = DB::table('supplier_payments as sp')
            ->join('suppliers as s', 's.id', '=', 'sp.supplier_id')
            ->selectRaw("
                s.name,
                sp.due_date                as expiry,
                sp.payment_method,
                sp.amount                  as total,
                IF(sp.is_paid=1,'ödendi','ödenmedi') as status
            ")
            ->orderBy('sp.due_date')
            ->limit(5)
            ->get();

        $monthlyInternalExternal = DB::table('enrollments')
            ->selectRaw("
                DATE_FORMAT(created_at,'%Y-%m')                           as month,
                SUM(CASE WHEN branch_id IS NULL OR branch_id = 1 THEN 1 ELSE 0 END) as internal,
                SUM(CASE WHEN branch_id IS NOT NULL AND branch_id <> 1 THEN 1 ELSE 0 END) as external
            ")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $periodicComparison = DB::table('enrollments')
            ->selectRaw('seasons_id , COUNT(*) as number, SUM(final_fee) as endorsement')
            ->groupBy('seasons_id')
            ->get();

        $financialTasks = DB::table('tasks')
            ->select('name as task_name', 'task_to as last_date')
            ->where('task_to', '>=', $now)
            ->latest('task_to')
            ->limit(5)
            ->get();

        $promisesToPay = DB::table('debts as d')
            ->join('suppliers as s', 's.id', '=', 'd.supplier_id')
            ->selectRaw("
                d.season_id    as season,
                s.name,
                s.phone,
                d.due_date     as payment_date,
                d.amount,
                IF(d.due_date <= CURDATE(),'tamamlandı','beklemede') as status,
                d.description
            ")
            ->orderBy('d.due_date')
            ->limit(5)
            ->get();

        $salaryStatus = [
            'aylik'  => (float) DB::table('personel_maas_borc')->sum('aylik_ucret'),
            'yillik' => (float) DB::table('personel_maas_borc')->sum(DB::raw('aylik_ucret * maas_sayisi')),
            'diger'  => (float) DB::table('personel_maas_borc')->whereNull('maas_ayi')->sum('aylik_ucret'),
        ];

        /* -------------------------------------------------
         | 3 – Servis & ulaşım
         * ------------------------------------------------*/
        $vehicleCount    = DB::table('schoolbus_infos')->count();
        $vehicleSeats    = (int) DB::table('schoolbus_infos')->sum(DB::raw('CAST(seats AS UNSIGNED)'));
        $activeVehicles  = DB::table('schoolbus_drivings')->where('status', 'active')->count();
        $carriedStudents = DB::table('servicestudents')->count();

        $serviceStudentCapacity = $vehicleSeats ? "$carriedStudents/$vehicleSeats" : '0/0';

        $firstBus = DB::table('schoolbus_infos')->first();
        $firstBusStudents = $firstBus
            ? DB::table('servicestudents')->where('service_id', $firstBus->schoolbus_id)->count()
            : 0;

        /* -------------------------------------------------
         | 4 – Operasyonel / akademik ayrıntılar
         * ------------------------------------------------*/
        $lessonsTaught = (int) DB::table('daily_lesson_numbers')->sum('total_lessons');
        $cafeteriaAttendance = DB::table('attendances')->count(); // placeholder

        $classHourAttendance = DB::table('attendancestudents as a')
            ->join('students as s', 'a.student_id', '=', 's.id')
            ->select('s.id', 's.first_name', 's.last_name')
            ->latest('a.created_at')
            ->limit(5)
            ->get();

        // Öğretmen günlük devamsızlık
        $attendanceTeachersToday = DB::table('attendanceteachers')
            ->whereDate('created_at', $now->toDateString())
            ->count();
        $dailyAttendanceStatus = "$attendanceTeachersToday/$teachers";

        // Ödevler
        $homeworkGiven = $assignments;
        $homeworkDone  = DB::table('assignmentstudents')->where('status', 1)->count();

        // Deneme sınavı skor dağılımı (son 5 deneme)
        $trialExams = DB::table('quizresults')
            ->select('quiz_id', DB::raw('AVG(success_rate) as avg'))
            ->groupBy('quiz_id')
            ->latest('quiz_id')
            ->limit(5)
            ->get();

        $completedAssignments = DB::table('assignmentstudents')
            ->select('assignment_id', DB::raw('COUNT(*) as completed'))
            ->where('status', 1)
            ->groupBy('assignment_id')
            ->latest('assignment_id')
            ->limit(5)
            ->get();

        $weeklyProgram = DB::table('lesson_programs')
            ->select('name', 'weekly_hourse')
            ->orderBy('name')
            ->limit(5)
            ->get();

        $dailySchedule = DB::table('lesson_hours')
            ->select('lesson_number', 'lesson_hourse')
            ->orderBy('lesson_number')
            ->get();

        $weeklyDuty = DB::table('tasks')
            ->select('name', 'task_to')
            ->orderBy('task_to')
            ->limit(5)
            ->get();

        $courseSuccess = DB::table('quizresults as q')
            ->join('students as s', 'q.student_id', '=', 's.id')
            ->select('s.program_id', DB::raw('AVG(success_rate) as avg_success'))
            ->groupBy('s.program_id')
            ->get();

        $pdrMeetings = DB::table('guidancemeetings')
            ->select('student_id', 'meeting_topic', 'meeting_date')
            ->latest('meeting_date')
            ->limit(5)
            ->get();

        /* -------------------------------------------------
         | 5 – İK, bildirim, görev & veli geri bildirim
         * ------------------------------------------------*/
        $upcomingAppointments = DB::table('appointments')
            ->select('id', 'meeting_date', 'meeting_note')
            ->where('meeting_date', '>=', $now)
            ->orderBy('meeting_date')
            ->limit(5)
            ->get();

        $upcomingTasks = DB::table('tasks')
            ->select('id', 'name', 'task_to')
            ->where('task_to', '>=', $now)
            ->orderBy('task_to')
            ->limit(5)
            ->get();

        $dailyBulletins = DB::table('notifications')
            ->select(DB::raw('id as title'), 'message as detail')
            ->latest('created_at')
            ->limit(5)
            ->get();

        $parentFeedback = DB::table('guardianmeetings as g')
            ->leftJoin('guardians as u', 'u.id', '=', 'g.guardian_id')
            ->selectRaw("
                g.meeting_date        as date,
                COALESCE(u.full_name,'') as parent_name,
                g.subject             as unit_title,
                g.teacher          as contact_person,
                g.notes               as description
            ")
            ->latest('g.meeting_date')
            ->limit(5)
            ->get();

        $staffLeaves = DB::table('personel_iadeler as p')
            ->leftJoin('personeller as s', 's.id', '=', 'p.personel_id')
            ->selectRaw("
                CONCAT(s.ad,' ',s.soyad) as name_surname,
                s.gorev                 as task,
                'izin'                  as `permission_type`,
                '3 gün'                 as time,
                'onaylı'                as status,
                p.tarih                 as start_date
            ")
            ->latest('p.tarih')
            ->limit(5)
            ->get();

        $staffTasks = DB::table('tasks as t')
            ->join('users as u', 't.user_at', '=', 'u.id')
            ->selectRaw("
                'hademe'                                as task_categories,
                CONCAT(u.first_name,' ',u.last_name)    as name,
                t.task_to                               as mission_time,
                ''                                      as task_place,
                'bekliyor'                              as task_status,
                ''                                      as contact_information,
                t.name                                  as description
            ")
            ->latest('t.task_to')
            ->limit(5)
            ->get();

        $parentMeetingsCount = [
            'last_week' => $lastWeekParents,
            'total'     => DB::table('guardianmeetings')->count(),
        ];

        $pollTypeDistribution = DB::table('guardianmeetings')
            ->selectRaw('COUNT(*) as came')
            ->get();

        /* -------------------------------------------------
         |  Sonuç
         * ------------------------------------------------*/
        return $this->respond([
            'data' => [

                /* 1 – Akademik / idari */
                'register_number'                     => $registerNumber,
                'class_information'                  => $classInformation,
                'directory_message'                  => $directoryMessage,
                'general_information'                => $generalInformation,
                'number_of_parent_meetings'          => $numberOfParentMeetings,
                'daily_attendance_monitoring'        => $dailyAttendanceMonitoring,
                'number_of_classrooms'               => $numberOfClassrooms,
                'number_of_male_and_female_students' => $maleFemale,
                'exam_countdown'                     => $examCountdown,
                'course_distribution'                => $courseDistribution,
                'course_and_class_information'       => $courseAndClassInformation,
                'consultancy_information'            => $consultancy,
                'guidance_counseling_interview_table'=> $guidanceInfo,

                /* 2 – Finans */
                'installment_truck'                  => $installmentTruck,
                'cash_summary'                       => $cashSummary,
                'finance_status'                     => $financeStatus,
                'mounty_installment_status'          => $mountyInstallmentStatus,
                'payments'                           => ['suppliers' => $paymentSuppliers],
                'Number_of_internal_and_external_records_by_month' => $monthlyInternalExternal,
                'periodic_comparison'                => $periodicComparison,
                'financial_tasks_and_reminders'      => $financialTasks,
                'those_who_promise_to_pay'           => $promisesToPay,
                'monthly_annual_salary_status'       => $salaryStatus,

                /* 3 – Servis & ulaşım */
                'service_transportation_status' => [
                    'number_of_service_vehicles'       => $vehicleCount,
                    'number_of_late_arriving_vehicles' => 0, // iyileştirilebilir
                    'service_student_capacity'         => $serviceStudentCapacity,
                ],
                'service_capacity_utilization' => [
                    'total_capacity' => $vehicleSeats,
                    'carried'        => $carriedStudents,
                    'free_capacity'  => $vehicleSeats - $carriedStudents,
                ],
                'total_service_vehicles' => [
                    'total_vehicles' => $vehicleCount,
                    'active_vehicle' => $activeVehicles,
                    'in_care'        => $vehicleCount - $activeVehicles,
                ],
                'service_vehicle_student_numbers' => [
                    'service_vehicle_plate' => optional($firstBus)->plate,
                    'total_capacity'        => optional($firstBus)->seats,
                    'total_student'         => $firstBusStudents,
                ],

                /* 4 – Operasyonel / akademik ayrıntılar */
                'lessons_taught'                     => $lessonsTaught,
                'cafeteria_attendance'               => $cafeteriaAttendance,
                'class_hour_attendance_summary'      => $classHourAttendance,
                'daily_attendance_status'            => ['teachers' => $dailyAttendanceStatus],
                'homework_status_analysis'           => [
                    'homework_given' => $homeworkGiven,
                    'done'           => $homeworkDone,
                ],
                'trial_exam_score_distribution'      => $trialExams,
                'number_of_completed_assignments'    => $completedAssignments,
                'weekly_lesson_program'              => $weeklyProgram,
                'daily_class_schedule'               => $dailySchedule,
                'weekly_duty_schedule'               => $weeklyDuty,
                'course_success_analysis'            => $courseSuccess,
                'pdr_meeting_list'                   => $pdrMeetings,

                /* 5 – İK & bildirim */
                'upcoming_appointments'              => $upcomingAppointments,
                'upcoming_tasks_and_reminders'       => $upcomingTasks,
                'daily_bulletins'                    => $dailyBulletins,
                'parent_feedback_panel'              => $parentFeedback,
                'staff_leave_tracking_table'         => $staffLeaves,
                'staff_task_distribution_table'      => $staffTasks,
                'parent_meetings'                    => $parentMeetingsCount,
                'poll_type_distribution'             => $pollTypeDistribution,

                /* Ek sayımlar */
                'counts' => [
                    'students'   => $students,
                    'teachers'   => $teachers,
                    'classes'    => $classes,
                    'assignments'=> $assignments,
                ],
                'finance_totals' => [
                    'payments' => $totalPayments,
                    'expenses' => $totalExpenses,
                ],
            ],
        ]);
    }
}
