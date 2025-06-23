import { SmsProvider } from './list';
import SmsProvidersListStatus from '../../enums/smsproviders/list';

export interface AddSmsProviderPayload extends SmsProvider {}

export interface AddSmsProviderState {
  data: SmsProvider | null;
  status: SmsProvidersListStatus;
  error: string | null;
}
