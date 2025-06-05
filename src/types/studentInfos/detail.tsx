import { Studentinfo } from "./list";
import StudentinfosListStatus from "../../enums/studentInfos/list";

export interface StudentinfoDetailState {
  data: Studentinfo | null;
  status: StudentinfosListStatus;
  error: string | null;
}
