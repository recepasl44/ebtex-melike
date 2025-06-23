import SmsProvidersListStatus from '../../enums/smsproviders/list';

export interface DeleteSmsProviderPayload {
  id: number;
}

export interface DeleteSmsProviderState {
  deletedId: number | null;
  status: SmsProvidersListStatus;
  error: string | null;
}
