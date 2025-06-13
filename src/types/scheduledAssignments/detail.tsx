import { ScheduledAssignmentData } from "./list";
import { ScheduledAssignmentsListStatus } from "../../enums/scheduledAssignments/list";

export interface ScheduledAssignmentsDetailState {
  data: ScheduledAssignmentData | null;
  status: ScheduledAssignmentsListStatus;
  error: string | null;
}
