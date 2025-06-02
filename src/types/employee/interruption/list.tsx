import InterruptionListStatus from "../../../enums/employee/interruption/list";

export interface Interruption {
  id: number;
  personel_id: number;
  vade: string;
  miktar: string;
  odeme_sekli: string;
  banka_hesap_adi: string;
  aciklama: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
  alinan: string;
  gonderen_ad_soyad: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface InterruptionListPaginate {
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

export interface InterruptionListResponse {
  data: Interruption[];
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

export interface InterruptionListState {
  data: Interruption[] | null;
  status: InterruptionListStatus;
  error: string | null;
}

export interface InterruptionListArgs {
  enabled?: boolean;
  [key: string]: any;
}
