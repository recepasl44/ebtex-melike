import TuitionFeesListStatus from "../../../enums/employee/tuition_fees/list";
import { TuitionFees } from "./list";

export interface TuitionFeesAddPayload {
  tarih: string;
  ders_sayisi: number;
  ders_ucreti: string;
}

export interface TuitionFeesAddState {
  data: TuitionFees | null;
  status: TuitionFeesListStatus;
  error: string | null;
}
