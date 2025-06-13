import { Debit } from "./list";
import { DebitListStatus } from "../../../../enums/employee/salary/debit/list";

export interface DebitShowState {
  data: Debit | null;
  status: DebitListStatus;
  error: string | null;
}
