import { ScheduledAssignmentData } from "./list";
import { ScheduledAssignmentsListStatus } from "../../enums/scheduledAssignments/list";

export interface ScheduledAssignmentsDeletePayload {
  id?: number;
}

export interface ScheduledAssignmentsDeleteState {
  data: ScheduledAssignmentData | null;
  status: ScheduledAssignmentsListStatus;
  error: string | null;
}
