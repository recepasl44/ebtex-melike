import { Coaching } from "./list";
import CoachingListStatus from "../../../enums/employee/coaching/list";

export interface CoachingShowState {
  data: Coaching | null;
  status: CoachingListStatus;
  error: string | null;
}
