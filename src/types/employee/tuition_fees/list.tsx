import TuitionFeesListStatus from "../../../enums/employee/tuition_fees/list";
import { Personel } from "../personel/list";

export interface TuitionFees {
  id: number;
  personel_id: number;
  tarih: string;
  ders_sayisi: number;
  ders_ucreti: string;
  toplam_ucret: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
  personel: Personel;
}

export interface TuitionFeesListState {
  data: TuitionFees[] | null;
  status: TuitionFeesListStatus;
  error: string | null;
}
export interface TuitionFeesListArgs {
  enabled?: boolean;
  [key: string]: any;
}
