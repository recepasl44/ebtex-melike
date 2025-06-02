import { ScheduledAssignmentsListStatus } from "../../enums/scheduledAssignments/list";
import { LevelData } from "../levels/list";
import { PeriodData } from "../periods/list";
import { Program } from "../programs/list";
import { IStudent } from "../student/list";

export interface ScheduledAssignmentData {
  id: number;
  period_id: number;
  period: PeriodData;
  student_id: number;
  student: IStudent;
  teacher_id: number;
  teacher: Teacher;
  program_id: number;
  program: Program;
  level_id: number;
  level: LevelData;
  unit_id: number;
  unit: any;
  chapter_id: number;
  chapter: any;
  topic_id: number;
  topic: any;
  achievement_id: number;
  achievement: any;
  source_id: number;
  source: Source;
  number_of_questions: number;
  working_time: string;
  start_date: string;
  end_date: string;
  description: string;
  remaining_time: string;
  status: number;
  status_count: Array<
    Array<{
      status: number;
      label: string;
      count: number;
    }>
  >;
  page_range: string;
  first_name: string;
  last_name: string;
  controlled: number;
  un_controlled: number;
  absent: number;
  unchecked: number;
  status_number: number;
  planned_question: number;
  planned_time: string;
  happened_time: number;
  happened_question: number;
  lesson_id: number;
  lessons: LessonInfo[];
}

export interface Source {
  id: number;
  source_type_id: number;
  class_section: string;
  subject: string;
  teacher_id: number;
  name: string;
  planned_assignment_count: number;
  status: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface Teacher {
  id: number;
  personel_id: number;
  name_surname: string;
  short_name: string;
  branch: string;
  class_teacher_id: number;
  social_club: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface LessonInfo {
  lesson: Lesson | null;
  units: UnitInfo[];
}

export interface Lesson {
  id: number;
  name: string;
  cover: string | null;
  area_id?: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface UnitInfo {
  unit: Unit | null;
  chapters: ChapterInfo[];
}

export interface Unit {
  id: number;
  name: string;
  cover: string | null;
  lesson_id: number | null;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: number | string;
  curriculum_type: string | null;
}

export interface ChapterInfo {
  chapter: Chapter | null;
  topics: TopicInfo[];
}

export interface Chapter {
  id: number;
  name: string;
  cover: string | null;
  unit_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string | number;
}

export interface TopicInfo {
  topic: Topic | null;
  achievements: Achievement[] | null;
}

export interface Topic {
  id: number;
  name: string;
  cover: string | null;
  chapter_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string | number;
}

export interface Achievement {
  id: number;
  name: string;
  cover: string | null;
  topic_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string;
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
