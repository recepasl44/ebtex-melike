import { SmsProvider } from './list';
import SmsProvidersListStatus from '../../enums/smsproviders/list';

export interface SmsProviderDetailState {
  data: SmsProvider | null;
  status: SmsProvidersListStatus;
  error: string | null;
}
