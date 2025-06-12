import {data} from './list';
import CourseListStatus from '../../enums/courses/list';

export interface CoursesUpdatePayload {
  courseId: number;
  payload: {
    name: string;
    level_id?: number | null;
  };
}
export interface CoursesUpdateState {
  data: data | null;
  status: CourseListStatus;
  error: string | null;
}


