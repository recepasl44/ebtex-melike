import { CoachingListStatus } from "../../../enums/employee/coaching/list";

export interface Coaching {
  id: number;
  personel_id: number;
  tarih: string;
  kisi_basi_ucret: number;
  ogrenci_sayisi: number;
  toplam_ucret: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  ad_soyad: string;
  ucret: string;
  kar_yuzdesi: string;
  gelir: string;
  kisi_basi_ucreti:string
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CoachingListPaginate {
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

export interface CoachingListResponse {
  data: Coaching[];
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

export interface CoachingListState {
  data: Coaching[];
  status: CoachingListStatus;
  error: string | null;
}

export interface CoachingListArgs {
  enabled?: boolean;
  [key: string]: any;
}
