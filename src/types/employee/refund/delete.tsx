import RefundDeleteStatus from "../../../enums/employee/refund/list";

export interface RefundDeleteState {
  data: number | null;
  status: RefundDeleteStatus;
  error: string | null;
}
