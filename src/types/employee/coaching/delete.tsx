import { Coaching } from "./list";
import CoachingDeleteStatus from "../../../enums/employee/coaching/list";

export interface CoachingDeleteState {
  data: Coaching | null;
  status: CoachingDeleteStatus;
  error: string | null;
}
