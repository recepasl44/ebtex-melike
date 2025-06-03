import { AgreementsListStatus } from '../../enums/agreements/list';

export interface AgreementsDeletePayload {
  id?: number;
}

export interface AgreementsDeleteResponse {
  success: boolean;
  message: string;
}

export interface AgreementsDeleteState {
  data: AgreementsDeleteResponse | null;
  status: AgreementsListStatus;
  error: string | null;
}
