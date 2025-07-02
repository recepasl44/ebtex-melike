import { QuizStudentData } from './list';
import QuizStudentsListStatus from '../../enums/quizstudents/list';

export interface QuizStudentsDeletePayload {
  id?: number;
}

export interface QuizStudentsDeleteState {
  data: QuizStudentData | null;
  status: QuizStudentsListStatus;
  error: string | null;
}
