import SmsProvidersListStatus from '../../enums/smsproviders/list';

export interface SmsProvider {
  id: number;
  name: string;
  sender: string;
  api_key: string;
  created_at: string;
  updated_at: string;
}

export interface SmsProvidersListArg {
  enabled?: boolean;
  [key: string]: any;
}

export interface SmsProvidersListResponse {
  data: SmsProvider[];
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
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface SmsProvidersListState {
  data: SmsProvider[] | null;
  links: SmsProvidersListResponse['links'] | null;
  meta: SmsProvidersListResponse['meta'] | null;
  status: SmsProvidersListStatus;
  error: string | null;
}
