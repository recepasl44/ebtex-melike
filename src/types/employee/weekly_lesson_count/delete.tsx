import WeeklyLessonCountDeleteStatus from "../../../enums/employee/weekly_lesson_count/list";

export interface WeeklyLessonCountDeletePayload {
  data: number | null;
  status: WeeklyLessonCountDeleteStatus;
  error: string | null;
}
