import { ScheduledAssignmentsListStatus } from "../../enums/scheduledAssignments/list";
import { data } from "../lessons/list";
import { LevelData } from "../levels/list";
import { Program } from "../programs/list";

export interface ScheduledAssignmentData {
  id: number;
  teacher_id: number;
  teacher: any;
  program_id: number;
  program: Program;
  level_id: number;
  level: LevelData;
  lesson_id: number;
  lesson: data;
  unit_id: number;
  unit: any;
  chapter_id: number;
  chapter: any;
  topic_id: number;
  topic: any;
  achievement_id: number;
  achievement: any;
  source_id: number;
  source: any;
  number_of_questions: number;
  working_time: string;
  start_date: string;
  end_date: string;
  description: string;
  status: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ScheduledAssignmentsListResponse {
  data: ScheduledAssignmentData[];
  links: Links;
  meta: Meta;
}

export interface ScheduledAssignmentsListState {
  data: ScheduledAssignmentData[];
  links: Links;
  status: ScheduledAssignmentsListStatus;
  error: string;
}

export interface ScheduledAssignmentsListArg {
  enabled?: boolean;
  [key: string]: any;
}
