import { Interruption } from "./list";
import InterruptionListStatus from "../../../enums/employee/interruption/list";

export interface InterruptionShowState {
  data: Interruption | null;
  status: InterruptionListStatus;
  error: string | null;
}
