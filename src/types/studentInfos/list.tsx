import StudentinfosListStatus from "../../enums/studentInfos/list";
import { IStudent } from "../student/list";

export interface Studentinfo {
  id: number;
  student_id: number;
  student: IStudent | null;
  birthplace: string;
  medical_support: string;
  special_conditions: string;
  extracurricular_activities: string;
  hobbies_and_skills: string;
  residential_address: string;
  transportation_status: number;
  emergency_contact_info: string;
  number_of_siblings: number;
  birth_order: number;
  chronic_illness: string;
  household_members: string;
  psychological_status: string;
  academic_performance: string;
  support_educations: string;
  additional_notes: string;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface StudentinfosListResponse {
  data: Studentinfo[];
  links: Links;
  meta: Meta;
}

export interface StudentinfosListState {
  data: Studentinfo[];
  links: Links;
  meta: Meta;
  loading: boolean;
  error: string | null;
  status: StudentinfosListStatus;
}

export interface StudentinfosListArg {
  enabled?: boolean;
  [key: string]: any;
}
