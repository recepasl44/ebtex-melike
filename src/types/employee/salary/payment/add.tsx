import { Payment } from "./list";
import { PaymentListStatus } from "../../../../enums/employee/salary/payment/list";

export interface PaymentAddPayload {
  borc_id?: number;
  miktar?: number;
  personel_id?:number;
  odeme_sekli?: string;
  aciklama?: string;
}

export interface PaymentAddState {
  data: Payment | null;
  status: PaymentListStatus;
  error: string | null;
}
