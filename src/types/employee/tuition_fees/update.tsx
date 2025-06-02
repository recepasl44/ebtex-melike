import { TuitionFees } from "./list";
import TuitionFeesListStatus from "../../../enums/employee/tuition_fees/list";

export interface TuitionFeesUpdatePayload {
  tuitionFeesId: number;
  payload: {
    tarih: string;
    ders_sayisi: number;
    ders_ucreti: string;
  };
}

export interface TuitionFeesUpdateState {
  data: TuitionFees | null;
  status: TuitionFeesListStatus;
  error: string | null;
}
