import CoachingListStatus from "../../../enums/employee/coaching/list";
import { Coaching } from "./list";

export interface CoachingAddPayload {
  personel_id: number;
  tarih: string;
  ogrenci_sayisi: number;
  ucret: number;
  toplam_ucret: number;
}

export interface CoachingAddResponse {
  data: Coaching;
  status: CoachingListStatus;
  error: string | null;
}
