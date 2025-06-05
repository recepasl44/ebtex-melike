
import DeleteInstallmentStatus from '../../enums/Installment/delete';

export interface DeleteInstallmentPayload {
  installmentId: number;
}
export interface DeleteInstallmentResponse {
  deletedId: number;
}

export interface DeleteInstallmentState {
  deletedId: number | null;
  status: DeleteInstallmentStatus;
  error: string | null;
}
