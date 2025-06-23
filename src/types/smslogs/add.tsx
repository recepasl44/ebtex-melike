import { SmsLog } from './list';
import SmsLogsListStatus from '../../enums/smslogs/list';

export interface AddSmsLogPayload extends SmsLog {}

export interface AddSmsLogState {
  data: SmsLog | null;
  status: SmsLogsListStatus;
  error: string | null;
}
