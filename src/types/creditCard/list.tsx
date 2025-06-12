import CreditCardStatus from "../../enums/creditCard/list";

export interface ICreditCard {
  id?: number;
  amount: string;
  card_holder_name: string;
  card_number: string;
  expire_month: string;
  expire_year: string;
  cvv: string;
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

export interface ICreditCardPaginate {
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

export interface CreditCardListResponse {
  data: ICreditCard[];
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

export interface CreditCardListState {
  data: ICreditCard[] | null;
  status: CreditCardStatus;
  error: string | null;
}

export interface CreditCardListArgs {
  enabled?: boolean;
  [key: string]: any;
}
