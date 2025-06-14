import SpecialTutorLessonDeleteStatus from "../../../enums/employee/special_tutor_lesson/list";

export interface SpecialTutorLessonDeleteState {
  data: number | null;
  status: SpecialTutorLessonDeleteStatus;
  error: string | null;
}
