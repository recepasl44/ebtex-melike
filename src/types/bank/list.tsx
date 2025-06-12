import BankListStatus from "../../enums/bank/list";

export interface IBank {
  id?: number;
  amount: string;
  bank_name: string;
  iban: string;
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

export interface IBankPaginate {
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

export interface BankListResponse {
  data: IBank[];
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

export interface BankListState {
  data: IBank[] | null;
  status: BankListStatus;
  error: string | null;
}

export interface BankListArgs {
  enabled?: boolean;
  [key: string]: any;
}
