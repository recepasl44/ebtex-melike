import { Payment } from "./list";
import { PaymentListStatus } from "../../../../enums/employee/salary/payment/list";

export interface PaymentUpdatePayload {
  paymentId: number;
  payload: {
    miktar: number;
    odeme_sekli: string;
    aciklama: string;
  };
}

export interface PaymentUpdateState {
  data: Payment | null;
  status: PaymentListStatus;
  error: string | null;
}
