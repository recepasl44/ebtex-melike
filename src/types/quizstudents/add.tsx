import { QuizStudentData } from './list';
import QuizStudentsListStatus from '../../enums/quizstudents/list';

export interface QuizStudentsAddPayload extends QuizStudentData {
  id: number;
}

export interface QuizStudentsAddState {
  data: QuizStudentData | null;
  status: QuizStudentsListStatus;
  error: string | null;
}
