import { SmsLog } from './list';
import SmsLogsListStatus from '../../enums/smslogs/list';

export interface UpdateSmsLogPayload {
  id: number;
  body: Omit<SmsLog, 'id'>;
}

export interface UpdateSmsLogState {
  data: SmsLog | null;
  status: SmsLogsListStatus;
  error: string | null;
}
