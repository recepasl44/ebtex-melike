import { ScheduledAssignmentData } from "./list";
import { ScheduledAssignmentsListStatus } from "../../enums/scheduledAssignments/list";

export interface ScheduledAssignmentsAddPayload {
  teacher_id: number;
  program_id?: number;
  level_id?: number;
  lesson_id: number;
  unit_id: number;
  chapter_id: number;
  topic_id: number;
  achievement_id?: number;
  source_id: number;
  number_of_questions: number;
  working_time: string;
  start_date: string;
  end_date?: string;
  description: string;
  status: number;
}

export interface ScheduledAssignmentsAddState {
  data: ScheduledAssignmentData | null;
  status: ScheduledAssignmentsListStatus;
  error: string | null;
}
