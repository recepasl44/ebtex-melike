import { Studentinfo } from "./list";
import StudentinfosListStatus from "../../enums/studentInfos/list";

export interface StudentinfosAddPayload {
  student_id: number;
  medical_support: string;
  special_conditions: string;
  extracurricular_activities: string;
  hobbies_and_skills: string;
  residential_address: string;
  transportation_status: number;
  emergency_contact_info: string;
  number_of_siblings: number;
  birth_order: number;
  birthplace: string;
  chronic_illness: string;
  household_members: string;
  psychological_status: string;
  academic_performance: string;
  support_educations: string;
  additional_notes: string;
}

export interface StudentinfosAddState {
  data: Studentinfo | null;
  status: StudentinfosListStatus;
  error: string | null;
}
