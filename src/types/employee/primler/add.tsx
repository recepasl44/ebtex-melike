import { Primler } from "./list";
import PrimlerListStatus from "../../../enums/employee/primler/list";

export interface PrimlerAddPayload {
  vade: string;
  personel_id : number
  miktar: string;
  tarih: string;
  aciklama: string;
}

export interface PrimlerAddState {
  data: Primler | null;
  status: PrimlerListStatus;
  error: string | null;
}
