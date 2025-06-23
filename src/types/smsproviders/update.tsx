import { SmsProvider } from './list';
import SmsProvidersListStatus from '../../enums/smsproviders/list';

export interface UpdateSmsProviderPayload {
  id: number;
  body: Omit<SmsProvider, 'id'>;
}

export interface UpdateSmsProviderState {
  data: SmsProvider | null;
  status: SmsProvidersListStatus;
  error: string | null;
}
