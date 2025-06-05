import ShowInstallmentStatus from '../../enums/Installment/show';


import { IInstallment } from './list';

export interface ShowInstallmentPayload {
  installmentId: number;
}

export interface ShowInstallmentResponse {
  id: number;
  enrollment_id: number;
  amount: string;

}


export interface ShowInstallmentState {
  data: IInstallment | null;
  status: ShowInstallmentStatus;
  error: string | null;
}
