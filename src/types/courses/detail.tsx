import {data} from './list';
import CoursesListStatus from '../../enums/courses/list';   
export interface CourseShowState {
    data: data | null;
    status: CoursesListStatus;
    error: string | null;
    }