import { IStudent } from "./list";

export interface UpdateStudentPayload {
  studentId: number;
  payload: {
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
    parent_id?: number;
    financial_status?: string;
    additional_information_1?: string;
    additional_information_2?: string;
  };
}

export interface UpdateStudentResponse {
  data?: IStudent;
}

export interface UpdateStudentState {
  data?: IStudent | null;
  status?: UpdateStudentStatus;
  error?: string | null;
}

export enum UpdateStudentStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}
