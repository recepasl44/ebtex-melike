import { SalaryListStatus } from "../../../enums/employee/salary/list";

export interface Salary {
  id: number;
  personel_id: number;
  aylik_ucret: string;
  odeme_sekli: string;
  maas_sayisi: number;
  baslangic_tarihi: string;
  olusturulma_tarihi: string;
  guncellenme_tarihi: string;
  platform_id: number;
  updated_at: string;
  created_At: string;
  maas_ayi: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface SalaryListPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: Salary[];
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface SalaryListResponse {
  data: Salary[];
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

export interface SalaryState {
  data: Salary[];
  status: SalaryListStatus;
  error: string | null;
}

export interface SalaryListArgs {
  enabled?: boolean;
  [key: string]: any;
}
