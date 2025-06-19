import OpenAccountListStatus from "../../enums/openAccount/list";

export interface IOpenAccount {
  id?: number;
  customer_name: string;
  some_description: string;
  branch_id: number;
  season_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number | null;
  description: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IOpenAccountPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface OpenAccountListResponse {
  data: IOpenAccount[];
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

export interface OpenAccountListState {
  data: IOpenAccount[] | null;
  status: OpenAccountListStatus;
  error: string | null;
}

export interface OpenAccountListArgs {
  enabled?: boolean;
  [key: string]: any;
}
