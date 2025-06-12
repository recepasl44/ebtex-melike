import { PeriodData } from "./list";
import { PeriodsListStatus } from "../../enums/periods/list";

export interface PeriodsDeletePayload {
  id?: number;
}

export interface PeriodsDeleteState {
  data: PeriodData | null;
  status: PeriodsListStatus;
  error: string | null;
}
