import { Primler } from "./list";
import PrimlerListStatus from "../../../enums/employee/primler/list";

export interface PrimlerUpdatePayload {
  primlerId: number;
  payload: {
    vade: string;
    miktar: string;
    tarih: string;
    aciklama: string;
  };
}

export interface PrimlerUpdateState {
  data: Primler | null;
  status: PrimlerListStatus;
  error: string | null;
}
