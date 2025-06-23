import SmsLogsListStatus from '../../enums/smslogs/list';

export interface DeleteSmsLogPayload {
  id: number;
}

export interface DeleteSmsLogState {
  deletedId: number | null;
  status: SmsLogsListStatus;
  error: string | null;
}
