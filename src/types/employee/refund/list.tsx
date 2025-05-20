import RefundListStatus from "../../../enums/employee/refund/list";

export interface Refund {
  id: number;
  personel_id: number;
  tarih: string;
  miktar: string;
  odeme_sekli: string;
  banka_hesap_adi: string;
  gonderen_ad_soyad: string;
  aciklama: string;
  olusturulma_tarihi: string;
  guncellenme_tarihi: string;
  platform_id: number;
  updated_At: string;
  created_At: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface RefundListPaginate {
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

export interface RefundListResponse {
  data: Refund[];
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

export interface RefundListState {
  data: Refund[] | null;
  status: RefundListStatus;
  error: string | null;
}

export interface RefundListArgs {
  enabled?: boolean;
  [key: string]: any;
}
