import CourseDeleteStatus from "../../enums/courses/list";
export interface CourseDeleteState {
  data: number | null;
  status: CourseDeleteStatus;
  error: string | null;
}
import { data } from "./list";
import CourseListStatus from "../../enums/courses/list";
export interface CoursesDeletePayload {
  id?: number;
}
export interface CoursesDeleteState {
  data: data | null;
  status: CourseListStatus;
  error: string | null;
}
