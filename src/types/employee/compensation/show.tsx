import { Compensation } from "./list";
import CompensationListStatus from "../../../enums/employee/compensation/list";

export interface CompensationShowState {
  data: Compensation | null;
  status: CompensationListStatus;
  error: string | null;
}
