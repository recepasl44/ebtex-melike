
import CreateInstallmentStatus from '../../enums/Installment/add';
import { IInstallment } from './list';


export interface CreateInstallmentPayload {
  enrollment_id: number;
  amount: string;        // "103000.00"
  order_no?: number;     // opsiyonel
  due_date?: string;
  is_paid?: boolean;
  payment_date?: string;

}


export interface CreateInstallmentResponse extends IInstallment {}

/**
 * Slice state
 */
export interface CreateInstallmentState {
  data: IInstallment | null;
  status: CreateInstallmentStatus;
  error: string | null;
}
