import { StudentPsychologicalData } from "./list";
import StudentPsychologicalsListStatus from "../../enums/studentPsychologicals/list";

export interface StudentPsychologicalDetailState {
  data: StudentPsychologicalData | null;
  status: StudentPsychologicalsListStatus;
  error: string | null;
}
