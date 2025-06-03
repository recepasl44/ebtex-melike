import { WeeklyLessonCount } from "./list";
import WeeklyLessonCountListStatus from "../../../enums/employee/weekly_lesson_count/list";

export interface WeeklyLessonCountShowState {
  data: WeeklyLessonCount | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}
