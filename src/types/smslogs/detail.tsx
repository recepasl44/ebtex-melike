import { SmsLog } from './list';
import SmsLogsListStatus from '../../enums/smslogs/list';

export interface SmsLogDetailState {
  data: SmsLog | null;
  status: SmsLogsListStatus;
  error: string | null;
}
