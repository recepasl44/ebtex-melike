export interface IGuardianSub {
  is_alive: boolean;
  is_parent: boolean;
  is_divorced: boolean;
  kinship_id: number;
  kinship: string;
  identification_no: number;
  full_name: string;
  phone: string;
  profession: string;
  home_phone: string;
  work_phone: string;
  address: string;
  work_address: string;
  birthday: string;
  workplace: string;
  email: string;
  wedding_anniversary: string;
  status: boolean;
}
export interface IStudent {
  surname: any;
  name: any;
  label: any;
  value(value: any): import("react").SetStateAction<string>;
  studentId?: number;
  id: number;
  branche_id: number;
  branche: Branch;
  season_id: number;
  season: Season | null;
  nationality_id: number;
  nationality: Nationality;
  identification_no: string;
  gender_id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  program_id: number;
  program: ProgramBrief | null;
  level_id: number;
  level: LevelBrief;
  course_id: number | null;
  course: CourseBrief | null;
  school_id: number | null;
  school: any | null;
  email: string;
  phone: string;
  mobile_phone: string | null;
  address_id: number;
  address: Address;
  parent_id: number;
  parent: any | null;
  financial_status: string | null;
  additional_information_1: string | null;
  additional_information_2: string | null;
  class_teacher: string | null;
  advisor_teacher: string | null;
  guide_teacher: string | null;
  created_by: number;
  status: number;
  enrollments: Enrollment[];
  payments: Payment[];
  profile_picture: string;
  contract_no: any[];

  /** Aşağıdakiler proje gereksinimi sebebiyle eklenmiş alanlar */
  register_no?: string | null;
  register_date?: string | null;
  /** Kayıt açan personel veya benzeri */
  by_register?: string | null;
  /** “Okul Türü” ID veya metin */
  schooltype_id?: string | null;
  /** Öğrenci Num. */
  student_no?: string | null;
  /** Kan Grubu */
  blood_type?: string | null;
  /** Hastalık bilgisi */
  illness?: string | null;
  /** Guardian: anne-baba-veli datası */
  guardian?: IGuardianSub;
  /** Okul adını text olarak saklamak istenirse */
  school_name?: string | null;
}

export interface ListStudentResponse {
  data: IStudent[];
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
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
  };
}

export interface Branch {
  id: number;
  name: string;
  created_by: number;
  type: number | null;
}

export interface Season {
  id: number;
  name: string;
}

export interface Nationality {
  id: number;
  name: string;
}

export interface ProgramBrief {
  id: number;
  name: string;
  category_id: number;
  category: string;
}

export interface LevelBrief {
  id: number;
  program_id: number;
  program: ProgramBrief;
  name: string;
}

export interface CourseBrief {
  id: number;
  level_id: number;
  level: LevelBrief;
  name: string;
}

export interface Address {
  id: number;
  country_id: number;
  country: any | null;
  city_id: number;
  city: any | null;
  county_id: number;
  county: any | null;
  district_id: number;
  district: any | null;
  neighborhood_id?: number | null;
  neighborhood: any | null;
  address: string;
}

export interface ServiceInEnrollment {
  id: number;
  branche_id: number;
  branche: Branch;
  level_id: number;
  level: LevelBrief;
  course_id: number | null;
  course: CourseBrief | null;
  program_id: number;
  program: ProgramBrief;
  type_id: number | null;
  type: any | null;
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

export interface Installment {
  id: number;
  enrollment_id: number;
  amount: string;
  order_no: number;
  due_date: string;
  is_paid: number | null;
  payment_date: string;
}

export interface Enrollment {
  id: number;
  student_id: number;
  service_id: number;
  service: ServiceInEnrollment;
  installments: Installment[];
  total_fee: string;
  discount_amount: string | null;
  discounts: any[];
  final_fee: string;
  advance_fee: string;
  remaining_fee: string | null;
  status: any | null;
}

export interface Payment {
  student_id: number;
  installment_id: number;
  installment: Installment;
  amount_paid: string;
  payment_date: string;
  payment_method: number;
}

export enum StudentListStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}
