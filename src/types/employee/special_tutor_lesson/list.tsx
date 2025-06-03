import SpecialTutorLessonListStatus from "../../../enums/employee/special_tutor_lesson/list";

export interface SpecialTutorLesson {
  id: number;
  personel_id: number;
  ogrenci_yuzdesi: number | null;
  gelir: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
  tarih: string;
  baslangic_saati: string;
  bitis_saati: string;
  kar_yuzdesi: string;
  ad_soyad: string;
  ucret: number;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface SpecialTutorLessonListPaginate {
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

export interface SpecialTutorLessonListResponse {
  data: SpecialTutorLesson[];
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

export interface SpecialTutorLessonListState {
  data: SpecialTutorLesson[] | null;
  status: SpecialTutorLessonListStatus;
  error: string | null;
}

export interface SpecialTutorLessonListArgs {
  enabled?: boolean;
  [key: string]: any;
}
