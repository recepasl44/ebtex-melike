export interface AuthorizedOperation {
  id: number;
  full_name: string;
  taken_amount: number;
  given_amount: number;
  remaining_amount: number;
}

export interface AuthorizedOperationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface AuthorizedOperationListResponse {
  data: AuthorizedOperation[];
  first_page_url?: string;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string | null;
  path?: string;
  prev_page_url?: string | null;
  meta?: AuthorizedOperationMeta;
}
