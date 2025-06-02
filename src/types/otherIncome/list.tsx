import OtherIncomeListStatus from "../../enums/otherIncome/list";

export interface OtherIncomeCustomer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export interface OtherIncomeData {
  id: number;
  season: string;
  date: string;
  customer_id: number;
  income_item: string;
  payment_method: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
  category_id: number | null;
  customer?: OtherIncomeCustomer | null;
  category?: any;
}

export interface OtherIncomeMeta {
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
}

export interface OtherIncomeListResponse {
  data: OtherIncomeData[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: OtherIncomeMeta;
}

export interface OtherIncomeListState {
  data: OtherIncomeData[] | null;
  links: OtherIncomeListResponse['links'] | null;
  meta: OtherIncomeMeta | null;
  status: OtherIncomeListStatus;
  error: string | null;
}

export interface OtherIncomeListArgs {
  enabled?: boolean;
  [key: string]: any;
}
