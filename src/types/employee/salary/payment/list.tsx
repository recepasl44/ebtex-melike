import PaymentListStatus from "../../../../enums/employee/salary/payment/list";

export interface Payment {
  id: number;
  borc_id: number;
  miktar: string;
  odeme_sekli: string;
  aciklama: string;
  odeme_tarihi: string;
  platform_id: number;
  updated_At: string;
  created_At: string;
  personel_id: number;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaymentListPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: Payment[];
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PaymentListResponse {
  data: Payment[];
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

export interface PaymentState {
  data: Payment[] | null;
  status: PaymentListStatus;
  error: string | null;
}

export interface PaymentListArgs {
  enabled?: boolean;
  [key: string]: any;
}
