import GuardiansListStatus from "../../enums/guardian/list";

export interface GuardianData {
  id: number;
  is_alive: number;
  is_parent: number;
  is_divorced: number;
  identification_no: string;
  full_name: string;
  phone: string;
  profession: string;
  home_phone: string;
  work_phone: string;
  address: string;
  work_address: string;
  birthday: string;
  birthplace: string;
  workplace: string;
  email: string;
  wedding_anniversary: string;
  student_id: number;
  kinship_id: number;
  kinship: string;
  health: string;
  education: string;
}

export interface GuardianLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface GuardianLinksItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface GuardianMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: GuardianLinksItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface GuardianListResponse {
  data: GuardianData[];
  links: GuardianLinks;
  meta: GuardianMeta;
}

export interface ExpenseListState {
  data: GuardianData[] | null;
  status: GuardiansListStatus;
  error: string | null;
}

export interface GuardianListArg {
  enabled?: boolean;
  [key: string]: any;
}
