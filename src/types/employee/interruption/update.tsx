import { Interruption } from "./list";
import InterruptionListStatus from "../../../enums/employee/interruption/list";

export interface InterruptionUpdatePayload {
  interruptionId: number;
  payload: {
    vade: string;
    miktar: string;
    odeme_sekli: string;
    aciklama: string;
  };
}

export interface InterruptionUpdateState {
  data: Interruption | null;
  status: InterruptionListStatus;
  error: string | null;
}
