import QuizResultsListStatus from '../../enums/quizResult/list';

export interface QuizResultsQuizType {
  id: number;
  name: string;
  penalty_rate: string | null;
}

export interface QuizResultsPlatform {
  id: number;
  name: string;
  country: string;
  city: string;
  county: string;
}

export interface QuizResultsBranche {
  id: number;
  name: string;
  created_by: number;
  type: number;
}

export interface QuizResultsSeason {
  id: number;
  name: string;
}

export interface QuizResultsProgram {
  id: number;
  name: string;
  category_id: number;
  category: string;
}

export interface QuizResultsDiscount {
  id: number;
  name: string;
  is_seasonal: number;
  type: number;
  discount_type: number;
  service_id: number;
  amount: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface QuizResultsInstallment {
  id: number;
  enrollment_id: number;
  amount: string;
  order_no: number;
  due_date: string;
  is_paid: number | null;
  payment_date: string;
}

export interface QuizResultsService {
  id: number;
  branche_id: number;
  branche: QuizResultsBranche;
  level_id: number | null;
  level: any;
  course_id: number | null;
  course: any;
  program_id: number | null;
  program: any;
  type_id: number | null;
  type: any;
  start_installment_date: string;
  end_installment_date: string;
  name: string;
  price: string;
  is_main: number;
  max_installments: number;
  max_discounts: number;
  accept_discount: number;
  vat_rate: string;
}

export interface QuizResultsEnrollment {
  id: number;
  student_id: number;
  service_id: number;
  service: QuizResultsService;
  installments: QuizResultsInstallment[];
  total_fee: string;
  discount_amount: string;
  discounts: QuizResultsDiscount[];
  final_fee: string;
  advance_fee: string;
  remaining_fee: string;
  status: any;
}

export interface QuizResultsStudentAddress {
  id: number;
  country_id: number;
  country: any;
  city_id: number;
  city: any;
  county_id: number;
  county: any;
  district_id: number;
  district: any;
  neighborhood_id: number;
  neighborhood: any;
  address: string;
}

export interface QuizResultsStudent {
  id: number;
  branche_id: number;
  branche: QuizResultsBranche;
  season_id: number | null;
  season: QuizResultsSeason | null;
  nationality_id: number;
  nationality: any;
  identification_no: string;
  gender_id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  program_id: number;
  program: QuizResultsProgram | null;
  level_id: number | null;
  level: any;
  course_id: number | null;
  course: any;
  school_id: number | null;
  school: any;
  email: string;
  phone: string;
  mobile_phone: string | null;
  address_id: number;
  address: QuizResultsStudentAddress | null;
  parent_id: number;
  parent: any;
  financial_status: string;
  additional_information_1: string | null;
  additional_information_2: string | null;
  class_teacher: any;
  advisor_teacher: any;
  guide_teacher: any;
  created_by: number;
  status: number;
  enrollments: QuizResultsEnrollment[];
  payments: any[];
  profile_picture: string;
  contract_no: any[];
}

export interface QuizResultsQuizItem {
  id: number;
  quiz_name: string;
  booklet_type_id: number | null;
  booklet_id: number | null;
}

export interface QuizResultsBookletItem {
  booklet_type_id: number | null;
  booklet_type: any;
  booklet_id: number | null;
  booklet: any;
}

export interface QuizResultsLessonResult {
  lesson_id: number;
  lesson_name: string;
  questions: number;
  corrects: number;
  wrongs: number;
  blanks: number;
  nets: string;
  class_average_net: string;
  class_net_comparison: string;
  branch_net: number;
  general_net: number;
}

export interface QuizResultsResult {
  quiz_id: number;
  quiz_name: string;
  lessons: QuizResultsLessonResult[];
}

export interface QuizResultsPointsItem {
  point_type_id: number;
  point_type_name: string | null;
  point: string;
  success_ordered: {
    class: number;
    branche: number;
    city: number;
    country: number;
    general: number;
  } | null;
  joined_number: {
    class: number;
    branche: number;
    city: number;
    country: number;
    general: number;
  } | null;
}

export interface QuizResultsGraphicDataItem {
  lesson_id: number;
  lesson_name: string;
  total_students: number;
  average_score: number;
  top_score: number;
}

export interface QuizResultsItem {
  id: number;
  is_parent: any;
  quiz_type_id: number;
  quiz_type: QuizResultsQuizType | null;
  quiz_no: string;
  short_name: string;
  quiz_name: string;
  quiz_id: number | null;
  quiz: any;
  platform: QuizResultsPlatform;
  student: QuizResultsStudent;
  quizzes: QuizResultsQuizItem[];
  booklets: QuizResultsBookletItem[];
  quiz_date: string;
  results: QuizResultsResult[];
  points: QuizResultsPointsItem[];
  global_joined_number: {
    class: number;
    branche: number;
    city: number;
    country: number;
    general: number;
  } | null;
  global_success_ordered: {
    class: number;
    branche: number;
    city: number;
    country: number;
    general: number;
  } | null;
  graphic_data: QuizResultsGraphicDataItem[];
  branche_id: number;
  branche: QuizResultsBranche;
  question_type_id: number | null;
  question_type: any;
  quiz_category_id: number;
  quiz_category: any;
  point_type_id: number;
  point_type: any;
  period_id: number | null;
  period: any;
  level_id: number | null;
  level: any;
  wrong_right: any;
  topic_achievement: any;
  total_questions: number;
  is_print: any;
  source_id: number | null;
  source: any;
  source_type_id: number | null;
  source_type: any;
  result_publish_datetime: any;
  participants: number;
  is_repeat: boolean;
  repeat_reason: string;
  status: number;
}

export interface QuizResultsListResponse {
  data: QuizResultsItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface QuizResultsListArg {
  enabled?: boolean;
  [key: string]: any;
}

export interface QuizResultsListState {
  data: QuizResultsItem[] | null;
  links: QuizResultsListResponse['links'] | null;
  meta: QuizResultsListResponse['meta'] | null;
  status: QuizResultsListStatus;
  error: string | null;
}
