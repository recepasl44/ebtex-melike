import InterruptionListStatus from "../../../enums/employee/interruption/list";

export interface InterruptionDeleteStatate {
  data: number | null;
  status: InterruptionListStatus;
  error: string | null;
}
