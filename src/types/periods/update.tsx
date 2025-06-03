import { PeriodData } from "./list";
import { PeriodsListStatus } from "../../enums/periods/list";

export interface PeriodsUpdatePayload {
  periodId: number;
  payload: {
    teacher_id?: number;
    name?: string;
    start_date?: string;
    end_date?: string;
  };
}

export interface PeriodsUpdateState {
  data: PeriodData | null;
  status: PeriodsListStatus;
  error: string | null;
}
