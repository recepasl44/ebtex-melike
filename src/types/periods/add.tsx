import { PeriodData } from "./list";
import { PeriodsListStatus } from "../../enums/periods/list";

export interface PeriodsAddPayload {
  teacher_id?: number;
  name?: string;
  start_date: string;
  end_date: string;
}

export interface PeriodsAddState {
  data: PeriodData | null;
  status: PeriodsListStatus;
  error: string | null;
}
