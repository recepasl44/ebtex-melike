export interface DashboardResponseType {
  data: Daum[];
}

export interface Daum {
  register_number: RegisterNumber;
  class_information: ClassInformation;
  directory_message: DirectoryMessage;
  number_of_lessons_taught: NumberOfLessonsTaught[];
  installment_truck: InstallmentTruck;
  service_transportation_status: ServiceTransportationStatus;
  cash_summary: CashSummary;
  service_capacity_utilization: ServiceCapacityUtilization;
  total_service_vehicles: TotalServiceVehicles;
  service_vehicle_student_numbers: ServiceVehicleStudentNumbers;
  service_route_status: ServiceRouteStatus;
  vehicle_maintenance_and_renewal: VehicleMaintenanceAndRenewal;
  number_of_cafeteria_attendance: NumberOfCafeteriaAttendance;
  number_of_classrooms: NumberOfClassroom[];
  class_hour_attendance_summary: ClassHourAttendanceSummary[];
  today_account_status: TodayAccountStatus;
  finance_status: FinanceStatus;
  course_and_class_information: CourseAndClassInformation;
  consultancy_information: ConsultancyInformation;
  course_distribution: CourseDistribution[];
  general_information: GeneralInformation;
  number_of_parent_meetings: NumberOfParentMeetings;
  daily_attendance_monitoring: DailyAttendanceMonitoring;
  monthly_installment_status: MonthlyInstallmentStatus;
  weekly_foods_menu: WeeklyFoodsMenu[];
  daily_attendance_status: DailyAttendanceStatus;
  payments: Payments;
  Number_of_internal_and_external_records_by_month: NumberOfInternalAndExternalRecordsByMonth;
  periodic_comparison: PeriodicComparison;
  daily_bulletins: DailyBulletin[];
  staff_leave_tracking_table: StaffLeaveTrackingTable[];
  staff_task_distribution_table: StaffTaskDistributionTable[];
  course_success_analysis: Analysis[];
  homework_status_analysis: HomeworkStatusAnalysis;
  upcoming_tasks_and_reminders: UpcomingTasksAndReminder[];
  number_of_male_and_female_students: NumberOfMaleAndFemaleStudent[];
  parent_feedback_panel: ParentFeedbackPanel[];
  exam_countdown: ExamCountdownItem[];
  daily_class_schedule: DailyClassSchedule[];
  weekly_duty_schedule: WeeklyDutySchedule[];
  trial_exam_score_distribution: TrialExamScoreDistribution[];
  service_status: Status[];
  number_of_completed_assignments: NumberOfCompletedAssignment[];
  parent_meetings: ParentMeetings;
  poll_type_distribution: PollTypeDistribution;
  pdr_meeting_list: PdrMeetingList[];
  financial_tasks_and_reminders: FinancialTasksAndReminder[];
  upcoming_appointments: Appointment[];
  those_who_promise_to_pay: ThoseWhoPromiseToPay[];
  monthly_annual_salary_status: MonthlyAnnualSalaryStatus;
  service_route_plan: ServiceRoutePlan[];
  service_payment_status: Status2[];
  quick_attendance_list: QuickAttendanceList[];
  service_route_time_performance: ServiceRouteTimePerformance[];
  service_route_and_stop_information: ServiceRouteAndStopInformation[];
  service_vehicle_information: ServiceVehicleInformation[];
  service_usage_by_day_of_the_week: ServiceUsageByDayOfTheWeek[];
  service_payment_information: ServicePaymentInformation[];
  service_information: ServiceInformation[];
  weekly_lesson_program: WeeklyLessonProgram[];
  guidance_counseling_interview_table: GuidanceCounselingInterviewTable;
  payment_and_financial_information: PaymentAndFinancialInformation;
  wage_status: WageStatus;
}
export interface WageStatus {
  paid: string;
  delayed: string;
  remaining: string;
}
export interface RegisterNumber {
  default: number;
  target: number;
  rate: string;
}

export interface ClassInformation {
  available: number;
  directory: string;
  advisor: string;
}

export interface DirectoryMessage {
  upcoming_meeting: string;
  last_target: string;
}

export interface NumberOfLessonsTaught {
  name: string;
  total: number;
}

export interface InstallmentTruck {
  total: string;
  payed: string;
  delayed: string;
}

export interface ServiceTransportationStatus {
  number_of_service_vehicles: number;
  number_of_late_arriving_vehicles: number;
  service_student_capacity: string;
}

export interface CashSummary {
  total_income: string;
  total_expense: string;
  total_balance: string;
}

export interface ServiceCapacityUtilization {
  total_capacity: number;
  carried: number;
  free_capacity: number;
}

export interface TotalServiceVehicles {
  total_vehicles: number;
  active_vehicle: number;
  in_care: number;
}

export interface ServiceVehicleStudentNumbers {
  service_vehicle_plate: string;
  total_capacity: number;
  total_student: number;
}

export interface ServiceRouteStatus {
  today_route: string;
  number_of_stops: number;
  arrival_time: string;
}

export interface VehicleMaintenanceAndRenewal {
  final_examination: string;
  maintenance_date: string;
  Insurance_renewal: string;
}

export interface NumberOfCafeteriaAttendance {
  breakfast: number;
  lunch: number;
  snack: number;
}

export interface NumberOfClassroom {
  name: string;
  total: string;
}

export interface ClassHourAttendanceSummary {
  name: string;
  total_student: number;
  "not _come": number;
  arrivals: number;
  student_name: string;
  parent_name: string;
  status: string;
  guard_phone: string;
  description: string;
}

export interface TodayAccountStatus {
  income: Income;
  expense: Expense;
}

export interface Income {
  cash: string;
  bank: string;
}

export interface Expense {
  cash: string;
  bank: string;
}

export interface FinanceStatus {
  entity: string;
  debt: string;
  net: string;
}

export interface CourseAndClassInformation {
  class: number;
  weekly_lesson: number;
  student: number;
}

export interface ConsultancyInformation {
  class: string;
  student: string;
  meet: string;
}

export interface CourseDistribution {
  name: string;
  consultancy: number;
}

export interface GeneralInformation {
  class: number;
  student: number;
  teacher: number;
}

export interface NumberOfParentMeetings {
  last_week: string;
  this_week: number;
  seasson: number;
}

export interface DailyAttendanceMonitoring {
  class: number;
  lesson_learned: number;
  lesson_not_learned: number;
}

export interface MonthlyInstallmentStatus {
  january: January;
  february: February;
  march: March;
  april: April;
  may: May;
  june: June;
  july: July;
  august: August;
  september: September;
  octaber: Octaber;
  novamber: Novamber;
  december: December;
}

export interface January {
  paid: string;
  un_paid: string;
}

export interface February {
  paid: string;
  un_paid: string;
}

export interface March {
  paid: string;
  un_paid: string;
}

export interface April {
  paid: string;
  un_paid: string;
}

export interface May {
  paid: string;
  un_paid: string;
}

export interface June {
  paid: string;
  un_paid: string;
}

export interface July {
  paid: string;
  un_paid: string;
}

export interface August {
  paid: string;
  un_paid: string;
}

export interface September {
  paid: string;
  un_paid: string;
}

export interface Octaber {
  paid: string;
  un_paid: string;
}

export interface Novamber {
  paid: string;
  un_paid: string;
}

export interface December {
  paid: string;
  un_paid: string;
}

export interface WeeklyFoodsMenu {
  monday: DayMeals;
  tuesday: DayMeals;
  wednesday: DayMeals;
  Thursday: DayMeals;
  Friday: DayMeals;
  Saturday: DayMeals;
  sunday: DayMeals;
  [key: string]: DayMeals;
}

export interface DayMeals {
  breakfast: string[];
  lunch: string[];
}
export interface DailyAttendanceStatus {
  teachers: string;
  personel: string;
  ana_okulu: string;
  ilkokul: string;
  ortaokul: string;
  fenlisesi: string;
  anadolulisesi: string;
  toplamlar: string;
}

export interface Payments {
  suppliers: Supplier[];
}

export interface Supplier {
  name: string;
  expiry: string;
  payment_method: string;
  total: string;
  status: string;
}

export interface NumberOfInternalAndExternalRecordsByMonth {
  january: January2;
  february: February2;
  march: March2;
  april: April2;
  may: May2;
  june: June2;
  july: July2;
  august: August2;
  september: September2;
  octaber: Octaber2;
  novamber: Novamber2;
  december: December2;
}

export interface January2 {
  internal: string;
  external: string;
}

export interface February2 {
  internal: string;
  external: string;
}

export interface March2 {
  internal: string;
  external: string;
}

export interface April2 {
  internal: string;
  external: string;
}

export interface May2 {
  internal: string;
  external: string;
}

export interface June2 {
  internal: string;
  external: string;
}

export interface July2 {
  internal: string;
  external: string;
}

export interface August2 {
  internal: string;
  external: string;
}

export interface September2 {
  internal: string;
  external: string;
}

export interface Octaber2 {
  internal: string;
  external: string;
}

export interface Novamber2 {
  internal: string;
  external: string;
}

export interface December2 {
  internal: string;
  external: string;
}
export interface ComparisonItem {
  seasson: string;
  number: number;
  endorsement: string;
  avarage: string;
}

export interface TotalChange {
  numberChange: string;
  endorsementChange: string;
  avarageChange: string;
}

export interface PeriodicComparison {
  totalChange: TotalChange;
  total: ComparisonItem[];
  anadolu: ComparisonItem[];
  Anaokulu: ComparisonItem[];
  ilkokul: ComparisonItem[];
  ortaokul: ComparisonItem[];
  anadolu_lisesi: ComparisonItem[];
  fen_lisesi: ComparisonItem[];
}
export interface DailyBulletin {
  title: string;
  detail: string;
}

export interface StaffLeaveTrackingTable {
  name_surname: string;
  task: string;
  permission_type: string;
  time: string;
  status: string;
  start_date: string;
}

export interface StaffTaskDistributionTable {
  task_categories: string;
  name: string;
  mission_time: string;
  task_place: string;
  task_status: string;
  contact_information: string;
  description: string;
}

export interface Analysis {
  program: string;
  lessons: Lesson[];
}

export interface Lesson {
  name: string;
  branch_avarage: number;
  top_avarage: number;
}

export interface HomeworkStatusAnalysis {
  homework_given: number;
  controlled: number;
  done: number;
}

export interface UpcomingTasksAndReminder {
  task_title: string;
  date: string;
  category: string;
  status: string;
  katılımcılar: string;
}

export interface NumberOfMaleAndFemaleStudent {
  name: string;
  girl: number;
  man: number;
}

export interface ParentFeedbackPanel {
  date: string;
  parent_name: string;
  category: string;
  unit_title: string;
  contact_person: string;
  description: string;
}

export interface ExamCountdownItem {
  name: string;
  date: string;
}

export interface DailyClassSchedule {
  name: string;
  levels: Level[];
}

export interface Level {
  name: string;
  classes: Class[];
}

export interface Class {
  name: string;
  no: number;
  hourse: string;
  lesson: string;
  teacher: string;
  status: string;
}

export interface WeeklyDutySchedule {
  monday: Monday2;
  tuesday: Tuesday2;
  wednesday: Wednesday2;
  Thursday: Thursday2;
  Friday: Friday2;
  Saturday: Saturday2;
  sunday: Sunday2;
}

export interface Monday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Tuesday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Wednesday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Thursday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Friday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Saturday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface Sunday2 {
  place: string;
  teacher: string;
  hourse: string;
  task_place: string;
  status: string;
}

export interface TrialExamScoreDistribution {
  name: string;
  branch: number;
  peak: number;
  gneral: number;
}

export interface Status {
  plate: string;
  route: string;
  location: string;
  missing_student: number;
  estimated_arrival: number;
}

export interface NumberOfCompletedAssignment {
  course: string;
  done: number;
  not_done: number;
  missing: number;
  did_not_come: number;
  was_not: number;
}
export interface ParentMeetings {
  last_week: number;
  total: number;
}

export interface PollTypeDistribution {
  came: number;
  notcame: number;
  on_leave: number;
  reported: number;
  came_late: number;
}

export interface PdrMeetingList {
  student_name: string;
  meeting_type: string;
  date: string;
  hourse: string;
  minute: string;
  status: string;
  description: string;
}

export interface FinancialTasksAndReminder {
  task_name: string;
  last_date: string;
  status: string;
  categories: string;
}

export interface Appointment {
  date: string;
  title: string;
  description: string;
  hourse: string;
}

export interface ThoseWhoPromiseToPay {
  seasson: string;
  name: string;
  phone: string;
  payment_date: string;
  amount: string;
  status: string;
  description: string;
}

export interface MonthlyAnnualSalaryStatus {
  aylik: number;
  yıllık: number;
  diğer: number;
}

export interface ServiceRoutePlan {
  group: string;
  seanse: string;
  start_time: string;
  time_of_arrival: string;
  route: string;
  days: string[];
  stops: string[];
}

export interface Status2 {
  name: string;
  yearly_price: string;
  paid: string;
  remainder: string;
  status: string;
}

export interface QuickAttendanceList {
  stop_no: string;
  student_name: string;
  boarding_time: string;
  status: string;
  contact_no: string;
}

export interface ServiceRouteTimePerformance {
  plate_no: string;
  start_time: string;
  end_time: string;
  delay: string;
}

export interface ServiceRouteAndStopInformation {
  plate_no: string;
  service_driver: string;
  seans: string;
  route: string;
  start_hourse: string;
  time_of_arrival: string;
}

export interface ServiceVehicleInformation {
  plate_no: string;
  service_driver: string;
  maintenance_date: string;
  insurance_and_renewal_date: string;
  examination_date: string;
}

export interface ServiceUsageByDayOfTheWeek {
  monday: Monday3;
  tuesday: Tuesday3;
  wednesday: Wednesday3;
  Thursday: Thursday3;
  Friday: Friday3;
  Saturday: Saturday3;
  sunday: Sunday3;
}

export interface Monday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Tuesday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Wednesday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Thursday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Friday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Saturday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface Sunday3 {
  registered_student: number;
  getting_on_the_shuttle: number;
  absentee_student: number;
  early_arrival: number;
}

export interface ServicePaymentInformation {
  service_driver: string;
  service_plate: string;
  group_name: string;
  passenger_capacity: number;
  number_of_passengers: number;
  total_income: string;
  paid: string;
  remainder: string;
}

export interface ServiceInformation {
  vehicle_plate: string;
  driver: string;
  number_of_seats: string;
  morning_time: string;
  night_time: string;
  route_and_stops: string;
  service_place: string;
  notification: string;
}

export interface WeeklyLessonProgram {
  monday: Monday4;
  tuesday: Tuesday4;
  wednesday: Wednesday4;
  Thursday: Thursday4;
  Friday: Friday4;
  Saturday: Saturday4;
  sunday: Sunday4;
}

export interface Monday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Tuesday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Wednesday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Thursday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Friday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Saturday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface Sunday4 {
  lesson_no: string;
  hour: string;
  lesson: string;
  teacher: string;
  attendance_status: string;
}

export interface GuidanceCounselingInterviewTable {
  discussed: string;
  meeting_time: string;
  meeting_hour: string;
  status: string;
  notes: string;
}
export interface PaymentAndFinancialInformation {
  services: PaymentService[];
  summary: PaymentSummary;
}

export interface PaymentService {
  type: string;
  total_amount: string;
  paid_amount: string;
  remaining_debt: string;
}

export interface PaymentSummary {
  total_amount: string;
  paid_amount: string;
  remaining_debt: string;
}
