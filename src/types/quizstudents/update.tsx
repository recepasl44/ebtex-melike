import { QuizStudentData } from './list';
import QuizStudentsListStatus from '../../enums/quizstudents/list';

export interface QuizStudentsUpdatePayload {
  quizStudentId: number;
  payload: Omit<QuizStudentData, 'id'>;
}

export interface QuizStudentsUpdateState {
  data: QuizStudentData | null;
  status: QuizStudentsListStatus;
  error: string | null;
}
