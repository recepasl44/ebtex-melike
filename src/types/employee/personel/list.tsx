import PersonelListStatus from "../../../enums/employee/personel/list";

export interface Personel {
  id: number;
  ad: string;
  soyad: string;
  tc_kimlik_no: string;
  mesleki_yas: string;
  ikametgah_adresi: string;
  gorev: string;
  brans: string;
  profil_foto: string;
  pozisyon: string;
  telefon: string;
  email: string;
  adres: string;
  dogum_tarihi: string;
  ise_giris_tarihi: string;
  aktif: number;
  olusturulma_tarihi: string;
  guncellenme_tarihi: string;
  platform_id: number;
  updated_At: string;
  created_At: string;
  works_for: string;
  base_salary: string;
  aggrements_date: { startDate: string; endDate: string };
  not_paid_date: [] ;
  aggrement_start_date: string;
  aggrement_end_date: string;
  register_no: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PersonelListPaginate {
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

export interface PersonelListResponse {
  data: Personel[];
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
export interface PersonelListState {
  data: Personel[] | null;
  status: PersonelListStatus;
  error: string | null;
}

export interface PersonelListArgs {
  enabled?: boolean;
  [key: string]: any;
}
