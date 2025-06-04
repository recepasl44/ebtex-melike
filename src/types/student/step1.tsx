export interface StudentStep1Payload {
    branche_id: number;
    identification_no: string;
    first_name: string;
    last_name: string;
    birthday: string;
    email: string;
    studentId?: number;
    phone: string;
    gender_id: number;
    mobile_phone: string;
    financial_status: string;
    additional_information_1: string;
    additional_information_2: string;
    class_teacher: string;
    advisor_teacher: string;
    guide_teacher: string;
    student_no: string;
    blood_type: string;
    illness: string;
    address: {
      country_id: number;
      city_id: number;
      county_id: number;
      district_id: number;
      neighborhood_id: number | null;
      address: string;
    };
    guardian: {
      [key: string]: {
        is_alive: boolean;
        is_parent: boolean;
        is_divorced: boolean;
        kinship_id: number;
        kinship: string;
        identification_no: string;
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
      };
    };
  }
  
  export interface StudentStep1Response {
    data: any;
  }
  
  export interface StudentStep1State {
    data: any | null;
    status: StudentStep1Status;
    error: string | null;
  }
  
  export enum StudentStep1Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  


