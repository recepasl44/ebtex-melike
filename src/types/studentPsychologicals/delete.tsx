import { StudentPsychologicalData } from "./list";
import StudentPsychologicalsListStatus from "../../enums/studentPsychologicals/list";

export interface StudentPsychologicalDeletePayload {
  id?: number;
}

export interface StudentPsychologicalDeleteState {
  data: StudentPsychologicalData | null;
  status: StudentPsychologicalsListStatus;
  error: string | null;
}
