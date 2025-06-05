import { PeriodData } from "./list";
import { PeriodsListStatus } from "../../enums/periods/list";

export interface PeriodsDetailState {
  data: PeriodData | null;
  status: PeriodsListStatus;
  error: string | null;
}
