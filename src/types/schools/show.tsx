import { ISchool } from "./list";
import SchoolListStatus from "../../enums/schools/list";

export interface SchoolShowState {
  data: ISchool | null;
  status: SchoolListStatus;
  error: string | null;
}
