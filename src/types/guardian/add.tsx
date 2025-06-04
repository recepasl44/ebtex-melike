import { GuardianData } from "./list";
import GuardiansListStatus from "../../enums/guardian/list";

export interface GuardiansAddPayload {
  is_alive?: number;
  is_parent?: number;
  is_divorced?: number;
  identification_no?: string;
  full_name?: string;
  phone?: string;
  profession?: string;
  home_phone?: string;
  work_phone?: string;
  address?: string;
  work_address?: string;
  birthday?: string;
  birthplace?: string;
  workplace?: string;
  email?: string;
  wedding_anniversary?: string;
  student_id?: number;
  kinship_id?: number;
  kinship?: string;
  health?: string;
  education?: string;
}

export interface GuardiansAddState {
  data: GuardianData | null;
  status: GuardiansListStatus;
  error: string | null;
}
