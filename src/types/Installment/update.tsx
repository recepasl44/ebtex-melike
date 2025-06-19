import UpdateInstallmentStatus from "../../enums/Installment/update";
import { IInstallment } from "./list";

/**
 * PUT /installments/:id body
 */
export interface UpdateInstallmentBody {
  enrollment_id?: number;
  student_id: number;
  amount?: string;
  due_date?: string;
  is_paid?: boolean | number;
  payment_date?: string;
  payment_method?: string;
  description?: string;
  image_base64?: string | null;
}

/**
 * thunk arg => hem id hem body
 */
export interface UpdateInstallmentPayload {
  installmentId: number;
  body: UpdateInstallmentBody;
}

export interface UpdateInstallmentResponse extends IInstallment {}

export interface UpdateInstallmentState {
  data: IInstallment | null;
  status: UpdateInstallmentStatus;
  error: string | null;
}
