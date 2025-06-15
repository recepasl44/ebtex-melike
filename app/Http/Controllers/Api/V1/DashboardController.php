<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends APIController
{
    public function index()
    {
        $data = array_merge(
            $this->getAcademicSummary(),
            $this->getFinanceSummary(),
            $this->getTransportSummary(),
            $this->getOperationalSummary(),
            $this->getHrSummary()
        );

        return $this->respond(['data' => [$data]]);

    }

    /**
     * Akademik ve idari özet bilgileri döndürür.
     */
    private function getAcademicSummary(): array
    {
        $now          = Carbon::now();
        $startOfWeek  = $now->copy()->startOfWeek();
        $endOfWeek    = $now->copy()->endOfWeek();
        $prevStart    = $now->copy()->subWeek()->startOfWeek();
        $prevEnd      = $now->copy()->subWeek()->endOfWeek();

        $students    = DB::table('students')->count();
        $teachers    = DB::table('teachers')->count();
        $classes     = DB::table('classes')->count();

        $registerTarget = $students + 20;
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
            'class'             => DB::table('attendances')->count(),
            'lesson_learned'    => DB::table('attendanceteachers')->count(),
            'lesson_not_learned'=> DB::table('attendancestudents')->count(),
        ];

        $numberOfClassrooms = DB::table('classrooms')
            ->select('name', DB::raw('COUNT(*) as total'))
            ->groupBy('name')
            ->get();

        $maleFemale = DB::table('students as s')
            ->join('programs as p', 's.program_id', '=', 'p.id')
            ->selectRaw('p.name, SUM(CASE WHEN s.gender_id = 2 THEN 1 END) as girl, SUM(CASE WHEN s.gender_id = 1 THEN 1 END) as man')
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
            ->selectRaw("g.guidance_name as class, CONCAT(s.first_name,' ',s.last_name) as student, CONCAT(WEEK(g.meeting_date),'/Hafta') as meet")
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

        $numberOfLessonsTaught = DB::table('lessons')
            ->select('name', DB::raw('COUNT(*) as total'))
            ->groupBy('name')
            ->limit(5)
            ->get();

        $numberOfCafeteriaAttendance = [
            'breakfast' => DB::table('attendances')->count(),
            'lunch'     => DB::table('attendances')->count(),
            'snack'     => DB::table('attendances')->count(),
        ];

        $classHourAttendance = DB::table('attendancestudents as a')
            ->join('students as s', 'a.student_id', '=', 's.id')
            ->select('s.id', 's.first_name', 's.last_name')
            ->latest('a.created_at')
            ->limit(5)
            ->get();

        $todayAccountStatus = [
            'income' => ['cash' => '0', 'bank' => '0'],
            'expense'=> ['cash' => '0', 'bank' => '0'],
        ];

        return [
            'register_number'                     => $registerNumber,
            'class_information'                  => $classInformation,
            'directory_message'                  => $directoryMessage,
            'number_of_lessons_taught'           => $numberOfLessonsTaught,
            'number_of_cafeteria_attendance'     => $numberOfCafeteriaAttendance,
            'number_of_classrooms'               => $numberOfClassrooms,
            'class_hour_attendance_summary'      => $classHourAttendance,
            'today_account_status'               => $todayAccountStatus,
            'finance_status'                     => [
                'entity' => (float) DB::table('open_accounts')->sum('amount'),
                'debt'   => (float) DB::table('debts')->sum('amount'),
                'net'    => (float) DB::table('open_accounts')->sum('amount') - (float) DB::table('debts')->sum('amount'),
            ],
            'course_and_class_information'       => $courseAndClassInformation,
            'consultancy_information'            => $consultancy,
            'course_distribution'                => $courseDistribution,
            'general_information'                => $generalInformation,
            'number_of_parent_meetings'          => $numberOfParentMeetings,
            'daily_attendance_monitoring'        => $dailyAttendanceMonitoring,
            'number_of_male_and_female_students' => $maleFemale,
            'exam_countdown'                     => $examCountdown,
            'guidance_counseling_interview_table'=> $guidanceInfo,
        ];
    }

    /**
     * Finansal verileri derler.
     */
    private function getFinanceSummary(): array
    {
        $now = Carbon::now();

        $totalPayments = DB::table('payments')->sum('amount_paid');
        $totalExpenses = DB::table('expenses')->sum('amount');

        $installments       = DB::table('installments');
        $installmentTruck   = [
            'total'   => $installments->count(),
            'payed'   => $installments->where('is_paid', 1)->count(),
            'delayed' => $installments->where('is_paid', 0)->where('due_date', '<', $now)->count(),
        ];

        $cashSummary = [
            'total_income'  => $totalPayments,
            'total_expense' => $totalExpenses,
            'total_balance' => $totalPayments - $totalExpenses,
        ];

        $monthlyInstallmentStatus = DB::table('installments')
            ->selectRaw("DATE_FORMAT(due_date,'%Y-%m') as month, SUM(CASE WHEN is_paid = 1 THEN amount ELSE 0 END)  as paid, SUM(CASE WHEN is_paid <> 1 THEN amount ELSE 0 END) as un_paid")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $paymentSuppliers = DB::table('supplier_payments as sp')
            ->join('suppliers as s', 's.id', '=', 'sp.supplier_id')
            ->selectRaw("s.name, sp.due_date as expiry, sp.payment_method, sp.amount as total, IF(sp.is_paid=1,'ödendi','ödenmedi') as status")
            ->orderBy('sp.due_date')
            ->limit(5)
            ->get();

        $monthlyInternalExternal = DB::table('enrollments')
            ->selectRaw("DATE_FORMAT(created_at,'%Y-%m') as month, SUM(CASE WHEN branch_id IS NULL OR branch_id = 1 THEN 1 ELSE 0 END) as internal, SUM(CASE WHEN branch_id IS NOT NULL AND branch_id <> 1 THEN 1 ELSE 0 END) as external")
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
            ->selectRaw("d.season_id as season, s.name, s.phone, d.due_date as payment_date, d.amount, IF(d.due_date <= CURDATE(),'tamamlandı','beklemede') as status, d.description")
            ->orderBy('d.due_date')
            ->limit(5)
            ->get();

        $salaryStatus = [
            'aylik'  => (float) DB::table('personel_maas_borc')->sum('aylik_ucret'),
            'yillik' => (float) DB::table('personel_maas_borc')->sum(DB::raw('aylik_ucret * maas_sayisi')),
            'diger'  => (float) DB::table('personel_maas_borc')->whereNull('maas_ayi')->sum('aylik_ucret'),
        ];

        $paymentServices = DB::table('services')
            ->select('name as type', DB::raw('SUM(price) as total_amount'), DB::raw('0 as paid_amount'), DB::raw('SUM(price) as remaining_debt'))
            ->groupBy('name')
            ->get();

        $paymentSummary = [
            'total_amount'   => DB::table('services')->sum('price'),
            'paid_amount'    => $totalPayments,
            'remaining_debt' => DB::table('services')->sum('price') - $totalPayments,
        ];

        $paymentAndFinancialInformation = [
            'services' => $paymentServices,
            'summary'  => $paymentSummary,
        ];

        $wageStatus = [
            'paid'      => (float) DB::table('personel_maas_odeme')->sum('miktar'),
            'delayed'   => (float) DB::table('personel_maas_borc')->where('created_at', '<', $now)->sum('aylik_ucret'),
            'remaining' => (float) DB::table('personel_maas_borc')->sum('aylik_ucret') - (float) DB::table('personel_maas_odeme')->sum('miktar'),
        ];

        return [
            'installment_truck'                  => $installmentTruck,
            'cash_summary'                       => $cashSummary,
            'finance_status'                     => $paymentSummary,
            'monthly_installment_status'         => $monthlyInstallmentStatus,
            'payments'                           => ['suppliers' => $paymentSuppliers],
            'Number_of_internal_and_external_records_by_month' => $monthlyInternalExternal,
            'periodic_comparison'                => $periodicComparison,
            'financial_tasks_and_reminders'      => $financialTasks,
            'those_who_promise_to_pay'           => $promisesToPay,
            'monthly_annual_salary_status'       => $salaryStatus,
            'payment_and_financial_information'  => $paymentAndFinancialInformation,
            'wage_status'                        => $wageStatus,
        ];
    }

    /**
     * Servis ve ulaşım bilgilerini döndürür.
     */
    private function getTransportSummary(): array
    {
        $now = Carbon::now();

        $vehicleCount    = DB::table('schoolbus_infos')->count();
        $vehicleSeats    = (int) DB::table('schoolbus_infos')->sum(DB::raw('CAST(seats AS UNSIGNED)'));
        $activeVehicles  = DB::table('schoolbus_drivings')->where('status', 'active')->count();
        $carriedStudents = DB::table('servicestudents')->count();

        $serviceStudentCapacity = $vehicleSeats ? "$carriedStudents/$vehicleSeats" : '0/0';

        $firstBus = DB::table('schoolbus_infos')->first();
        $firstBusStudents = $firstBus
            ? DB::table('servicestudents')->where('service_id', $firstBus->schoolbus_id)->count()
            : 0;

        $serviceStatus = DB::table('schoolbus_infos as v')
            ->select('v.plate_no as plate', DB::raw('"" as route'), DB::raw('"" as location'), DB::raw('0 as missing_student'), DB::raw('0 as estimated_arrival'))
            ->limit(5)
            ->get();

        $serviceRoutePlan = DB::table('serviceplans as sp')
            ->leftJoin('routes as r', 'sp.route_id', '=', 'r.id')
            ->select('sp.id as group', DB::raw('"" as seanse'), DB::raw('TIME(sp.start_date) as start_time'), DB::raw('TIME(sp.end_date) as time_of_arrival'), 'r.name as route')
            ->limit(5)
            ->get();

        $servicePaymentStatus = DB::table('services as s')
            ->select('s.name', 's.price as yearly_price', DB::raw('0 as paid'), DB::raw('s.price as remainder'), DB::raw('"beklemede" as status'))
            ->limit(5)
            ->get();

        $quickAttendanceList = DB::table('servicestops as st')
            ->select('st.name as stop_no', DB::raw('"" as student_name'), DB::raw('null as boarding_time'), DB::raw('"" as status'), DB::raw('"" as contact_no'))
            ->limit(5)
            ->get();

        $serviceRouteTimePerformance = DB::table('serviceplans')
            ->select('id as plate_no', DB::raw('TIME(start_date) as start_time'), DB::raw('TIME(end_date) as end_time'), DB::raw('TIMESTAMPDIFF(MINUTE,start_date,end_date) as delay'))
            ->limit(5)
            ->get();

        $serviceRouteAndStopInformation = DB::table('routes as r')
            ->join('vehicles as v', 'r.vehicle_id', '=', 'v.id')
            ->select('v.plate_no', 'v.owner as service_driver', DB::raw('"sabah" as seans'), 'r.name as route', DB::raw('"" as start_hourse'), DB::raw('"" as time_of_arrival'))
            ->limit(5)
            ->get();

        $serviceVehicleInformation = DB::table('vehicles')
            ->select('plate_no', 'owner as service_driver', 'check_date as maintenance_date', 'insurance_date as insurance_and_renewal_date', 'mtv_date as examination_date')
            ->limit(5)
            ->get();

        $serviceUsageByDayOfTheWeek = [
            [
                'monday'    => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'tuesday'   => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'wednesday' => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'Thursday'  => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'Friday'    => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'Saturday'  => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
                'sunday'    => ['registered_student' => 0, 'getting_on_the_shuttle' => 0, 'absentee_student' => 0, 'early_arrival' => 0],
            ],
        ];

        $servicePaymentInformation = DB::table('services as s')
            ->selectRaw('"" as service_driver, "" as service_plate, s.name as group_name, 0 as passenger_capacity, 0 as number_of_passengers, s.price as total_income, 0 as paid, s.price as remainder')
            ->limit(5)
            ->get();

        $serviceInformation = DB::table('vehicles')
            ->select('plate_no as vehicle_plate', 'owner as driver', 'capacity as number_of_seats', DB::raw('"" as morning_time'), DB::raw('"" as night_time'), DB::raw('"" as route_and_stops'), DB::raw('"" as service_place'), DB::raw('"" as notification'))
            ->limit(5)
            ->get();

        return [
            'service_transportation_status' => [
                'number_of_service_vehicles'       => $vehicleCount,
                'number_of_late_arriving_vehicles' => 0,
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
            'service_status'                     => $serviceStatus,
            'service_route_plan'                 => $serviceRoutePlan,
            'service_payment_status'             => $servicePaymentStatus,
            'quick_attendance_list'              => $quickAttendanceList,
            'service_route_time_performance'     => $serviceRouteTimePerformance,
            'service_route_and_stop_information' => $serviceRouteAndStopInformation,
            'service_vehicle_information'        => $serviceVehicleInformation,
            'service_usage_by_day_of_the_week'   => $serviceUsageByDayOfTheWeek,
            'service_payment_information'        => $servicePaymentInformation,
            'service_information'                => $serviceInformation,
        ];
    }

    /**
     * Operasyonel ve akademik ayrıntılar.
     */
    private function getOperationalSummary(): array
    {
        $now = Carbon::now();
        $teachers     = DB::table('teachers')->count();
        $assignments  = DB::table('assignments')->count();

        $lessonsTaught = (int) DB::table('daily_lesson_numbers')->sum('total_lessons');
        $cafeteriaAttendance = DB::table('attendances')->count();

        $classHourAttendance = DB::table('attendancestudents as a')
            ->join('students as s', 'a.student_id', '=', 's.id')
            ->select('s.id', 's.first_name', 's.last_name')
            ->latest('a.created_at')
            ->limit(5)
            ->get();

        $attendanceTeachersToday = DB::table('attendanceteachers')
            ->whereDate('created_at', $now->toDateString())
            ->count();
        $dailyAttendanceStatus = "$attendanceTeachersToday/$teachers";

        $homeworkGiven = $assignments;
        $homeworkDone  = DB::table('assignmentstudents')->where('status', 1)->count();

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

        return [
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
        ];
    }

    /**
     * İnsan kaynakları ve bildirim verileri.
     */
    private function getHrSummary(): array
    {
        $now = Carbon::now();

        $startOfWeek  = $now->copy()->startOfWeek();
        $endOfWeek    = $now->copy()->endOfWeek();
        $prevStart    = $now->copy()->subWeek()->startOfWeek();
        $prevEnd      = $now->copy()->subWeek()->endOfWeek();

        $lastWeekParents = DB::table('guardianmeetings')
            ->whereBetween('meeting_date', [$prevStart, $prevEnd])
            ->count();

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
            ->selectRaw('g.meeting_date as date, COALESCE(u.full_name,"") as parent_name, g.subject as unit_title, g.teacher as contact_person, g.notes as description')
            ->latest('g.meeting_date')
            ->limit(5)
            ->get();

        $staffLeaves = DB::table('personel_iadeler as p')
            ->leftJoin('personeller as s', 's.id', '=', 'p.personel_id')
            ->selectRaw('CONCAT(s.ad," ",s.soyad) as name_surname, s.gorev as task, "izin" as permission_type, "3 gün" as time, "onaylı" as status, p.tarih as start_date')
            ->latest('p.tarih')
            ->limit(5)
            ->get();

        $staffTasks = DB::table('tasks as t')
            ->join('users as u', 't.user_at', '=', 'u.id')
            ->selectRaw('"hademe" as task_categories, CONCAT(u.first_name," ",u.last_name) as name, t.task_to as mission_time, "" as task_place, "bekliyor" as task_status, "" as contact_information, t.name as description')
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

        return [
            'upcoming_appointments'         => $upcomingAppointments,
            'upcoming_tasks_and_reminders'  => $upcomingTasks,
            'daily_bulletins'               => $dailyBulletins,
            'parent_feedback_panel'         => $parentFeedback,
            'staff_leave_tracking_table'    => $staffLeaves,
            'staff_task_distribution_table' => $staffTasks,
            'parent_meetings'               => $parentMeetingsCount,
            'poll_type_distribution'        => $pollTypeDistribution,
        ];
    }
}
