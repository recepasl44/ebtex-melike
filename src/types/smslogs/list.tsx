import SmsLogsListStatus from '../../enums/smslogs/list';

export interface SmsLog {
  id: number;
  sms_provider_id: number | null;
  phone: string;
  message: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface SmsLogsListArg {
  enabled?: boolean;
  [key: string]: any;
}

export interface SmsLogsListResponse {
  data: SmsLog[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface SmsLogsListState {
  data: SmsLog[] | null;
  links: SmsLogsListResponse['links'] | null;
  meta: SmsLogsListResponse['meta'] | null;
  status: SmsLogsListStatus;
  error: string | null;
}
