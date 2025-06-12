import { Studentinfo } from "./list";
import StudentinfosListStatus from "../../enums/studentInfos/list";

export interface StudentinfosDeletePayload {
  id?: number;
}

export interface StudentinfosDeleteState {
  data: Studentinfo | null;
  status: StudentinfosListStatus;
  error: string | null;
}
