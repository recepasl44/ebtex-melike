import PrimlerListStatus from "../../../enums/employee/primler/list";

export interface Primler {
  id: number;
  personel_id: number;
  vade: string;
  miktar: string;
  aciklama: string;
  updated_at: string;
  created_At: string;
  platform_id: number;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PrimlerListPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: ILink[];
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PrimlerListResponse {
  data: Primler[];
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PrimlerState {
  data: Primler[];
  status: PrimlerListStatus;
  error: string | null;
}

export interface PrimlerListArgs {
  enabled?: boolean;
  [key: string]: any;
}
