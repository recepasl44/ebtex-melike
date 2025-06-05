import CompensationListStatus from "../../../enums/employee/compensation/list";
import { Personel } from "../personel/list";

export interface Compensation {
  id: number;
  personel_id: number;
  tazminat_turu: string;
  odeme_sekli: string;
  miktar: string;
  banka_hesap_adi: string;
  aciklama: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
  name: string | null;
  surname: string | null;
  personel: Personel;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CompensationListPaginate {
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

export interface CompensationListResponse {
  data: Compensation[];
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

export interface CompensationState {
  data: Compensation[];
  status: CompensationListStatus;
  error: string | null;
}
export interface CompensationListArgs {
  enabled?: boolean;
  [key: string]: any;
}
