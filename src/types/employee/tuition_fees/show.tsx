import { TuitionFees } from "./list";
import TuitionFeesListStatus from "../../../enums/employee/tuition_fees/list";

export interface TuitionFeesShowState {
  data: TuitionFees | null;
  status: TuitionFeesListStatus;
  error: string | null;
}
