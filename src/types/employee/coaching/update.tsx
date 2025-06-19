import { Coaching } from "./list";
import CoachingListStatus from "../../../enums/employee/coaching/list";

export interface CoachingUpdatePayload {
  coachingId: number;
  payload: {
    personel_id: number;
    tarih: string;
    kisi_basi_ucret: number;
    ogrenci_sayisi: number;
    toplam_ucret: number;
  };
}

export interface CoachingUpdateResponse {
  data: Coaching;
  status: CoachingListStatus;
  error: string | null;
}
