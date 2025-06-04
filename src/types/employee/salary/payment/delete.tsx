import PaymentListStatus from "../../../../enums/employee/salary/payment/list";

export interface PaymentDeleteState {
  data: number | null;
  status: PaymentListStatus;
  error: string | null;
}
