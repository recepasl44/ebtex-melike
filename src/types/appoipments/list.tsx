import { AppoipmenthListStatus } from '../../enums/appoipments/list'

export interface AppointmentResponse {

  data: data[];
  links: Links;
  meta: Meta;
}
export interface data {
  created_by: any;
  season: any;
  id?: number;
  season_id?: number;
  branche_id?: number;
  branche?: {
    id: number;
    name: string;
    created_by: number;
    type: string | null;
  };
  student_id?: number;
  student?: {
    id: number;
    branche_id: number;
    branche: {
      id: number;
      name: string;
      created_by: number;
      type: string | null;
    };
    season_id?: number;
    season: null;
    nationality_id: number;
    nationality: {
      id: number;
      name: string;
    };
    identification_no?: string;
    gender_id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    program_id: number;
    program: null;
    level_id: number;
    level: null;
    course_id: null;
    course: null;
    school_id: null;
    school: null;
    email: string;
    phone: string;
    mobile_phone: null;
    address_id: number;
    address: {
      id: number;
      country_id: number;
      country: null;
      city_id: number;
      city: null;
      county_id: number;
      county: null;
      district_id: number;
      district: null;
      neighborhood_id: null;
      neighborhood: null;
      address: string;
    };
    parent_id: number;
    parent: {
      id: number;
      is_alive: number;
      is_parent: number;
      is_divorced: number;
      identification_no: string;
      full_name: string;
      phone: string;
      profession: null;
      home_phone: null;
      work_phone: null;
      address: string;
      work_address: null;
      birthday: null;
      workplace: null;
      email: null;
      wedding_anniversary: null;
      student_id: number;
      kinship_id: number;
      kinship: string;
    };
    financial_status: null;
    additional_information_1: null;
    additional_information_2: null;
    class_teacher: null;
    advisor_teacher: null;
    guide_teacher: null;
    created_by: number;
    status: number;
    enrollments: Array<{
      id: number;
      student_id: number;
      service_id: number;
      service: {
        id: number;
        branche_id: number;
        branche: {
          id: number;
          name: string;
          created_by: number;
          type: string | null;
        };
        level_id: number;
        level: {
          id: number;
          program_id: number;
          program: {
            id: number;
            name: string;
            category_id: number;
            category: string;
          };
          name: string;
        };
        course_id: number;
        course: {
          id: number;
          level_id: number;
          level: {
            id: number;
            program_id: number;
            program: {
              id: number;
              name: string;
              category_id: number;
              category: string;
            };
            name: string;
          };
          name: string;
        };
        program_id: number;
        program: {
          id: number;
          name: string;
          category_id: number;
          category: string;
        };
        type_id?: number;
        type?: null;
        start_installment_date: string;
        end_installment_date: string;
        name: string;
        price: string;
        is_main: number;
        max_installments: number;
        max_discounts: number;
        accept_discount: number;
        vat_rate: string;
      };
      installments: Array<{
        id: number;
        enrollment_id: number;
        amount: null;
        order_no: number;
        due_date: string;
        is_paid: null;
        payment_date: string;
      }>;
      total_fee: string;
      discount_amount: null;
      discounts: Array<any>;
      final_fee: string;
      advance_fee: string;
      remaining_fee: null;
      status: null;
    }>;
    payments: Array<{
      student_id: number;
      installment_id: number;
      installment: {
        id: number;
        enrollment_id: number;
        amount: null;
        order_no: number;
        due_date: string;
        is_paid: null;
        payment_date: string;
      };
      amount_paid: string;
      payment_date: string;
      payment_method: number;
    }>;
    profile_picture: string;
    contract_no: Array<any>;
  };
  type_id?: number;
  type?: null;
  meeting_date?: string;
  meeting_note?: string;
  source?: string;
  meeting_by?: null;
};

export interface Meta {

  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
}
export interface Links {


  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
export interface AppointmentArgs {
  [key: string]: any;
  enabled?: boolean
}

export interface ListAppointmentState {
  data: data[];            // asıl taksit listesi
  meta: Meta | null;    // sayfalama bilgisi
  status: AppoipmenthListStatus;
  error: string | null;
}
