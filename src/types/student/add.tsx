import { IStudent } from "./list";

export interface AddStudentPayload {
  branche_id?: number;
  nationality_id?: number;
  identification_no?: string;
  gender_id?: number;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  program_id?: number;
  level_id?: number;
  email?: string;
  phone?: string;
  mobile_phone?: string;
  address_id?: number;
  address?: {
    country_id?: number;
    city_id?: number;
    county_id?: number;
    district_id?: number;
    neighborhood_id?: number;
    address?: string;
  };
  parent_id?: number;
  guardian?: {
    is_alive?: boolean;
    is_parent?: boolean;
    is_divorced?: number;
    kinship_id?: number;
    kinship?: string;
    identification_no?: number;
    full_name?: string;
    phone?: string;
    profession?: string;
    home_phone?: string;
    work_phone?: string;
    address?: string;
    work_address?: string;
    birthday?: string;
    workplace?: string;
    email?: string;
    wedding_anniversary?: string;
  };
  financial_status?: string;
  additional_information_1?: string;
  additional_information_2?: string;
}

export interface AddStudentResponse {
  data: IStudent;
}

export interface AddStudentState {
  data: IStudent | null;
  status: AddStudentStatus;
  error: string | null;
}

export enum AddStudentStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}
