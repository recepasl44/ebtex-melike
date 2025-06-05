import { Refund } from "./list";
import RefundListStatus from "../../../enums/employee/refund/list";

export interface RefundShowState {
  data: Refund | null;
  status: RefundListStatus;
  error: string | null;
}
