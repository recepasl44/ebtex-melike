import { SpecialTutorLesson } from "./list";
import SpecialTutorLessonListStatus from "../../../enums/employee/special_tutor_lesson/list";

export interface SpecialTutorLessonShowState {
  data: SpecialTutorLesson | null;
  status: SpecialTutorLessonListStatus;
  error: string | null;
}
