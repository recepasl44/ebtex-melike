import { PeriodsListStatus } from "../../enums/periods/list";

export interface PeriodTeacher {
  id: number;
  personel_id: number;
  name_surname: string;
  short_name: string;
  branch: string;
  class_teacher_id: number;
  social_club: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface PeriodData {
  id: number;
  teacher_id: number;
  teacher: PeriodTeacher | null;
  name: string;
  start_date: string;
  end_date: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PeriodsListResponse {
  data: PeriodData[];
  links: Links;
  meta: Meta;
}

export interface PeriodsListState {
  data: PeriodData[] | null;
  status: PeriodsListStatus;
  error: string | null;
}

export interface PeriodsListArg {
  enabled?: boolean;
  [key: string]: any;
}
