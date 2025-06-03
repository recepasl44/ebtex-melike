import WeeklyLessonCountListStatus from "../../../enums/employee/weekly_lesson_count/list";
import { WeeklyLessonCount } from "./list";

export interface WeeklyLessonCountAddPayload {
  hafta_kac_gun: number;
  personel_id :number
  gunluk_ucret: number;
}

export interface WeeklyLessonCountAddState {
  data: WeeklyLessonCount | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}
