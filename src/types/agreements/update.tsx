import { AgreementsListStatus } from '../../enums/agreements/list';

export interface AgreementsUpdatePayload {
  agreementId: number;
  payload: {
    name?: string;
    [key: string]: any;
  };
}

export interface AgreementsUpdateResponse {
  success: boolean;
  message: string;
  updatedData?: any;
}

export interface AgreementsUpdateState {
  data: AgreementsUpdateResponse | null;
  status: AgreementsListStatus;
  error: string | null;
}
