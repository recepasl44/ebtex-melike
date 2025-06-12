import WeeklyLessonCountListStatus from "../../../enums/employee/weekly_lesson_count/list";

export interface WeeklyLessonCount {
  id: number;
  personel_id: number;
  hafta_kac_gun: number;
  gunluk_ucret: string;
  platform_id: number;
  created_at: string;
  updated_at: string;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface WeeklyLessonCountListPaginate {
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

export interface WeeklyLessonCountListResponse {
  data: WeeklyLessonCount[];
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

export interface WeeklyLessonCountListState {
  data: WeeklyLessonCount[] | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}

export interface WeeklyLessonCountListArgs {
  enabled?: boolean;
  [key: string]: any;
}
