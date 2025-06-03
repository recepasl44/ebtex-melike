import InterruptionListStatus from "../../../enums/employee/interruption/list";
import { Interruption } from "./list";

export interface InterruptionAddPayload {
  vade: string;
  personel_id :number;
  miktar: string;
  odeme_sekli: string;
  aciklama: string;
}

export interface InterruptionAddState {
  data: Interruption | null;
  status: InterruptionListStatus;
  error: string | null;
}
