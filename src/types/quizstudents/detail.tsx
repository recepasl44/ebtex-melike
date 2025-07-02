import { QuizStudentData } from './list';
import QuizStudentsListStatus from '../../enums/quizstudents/list';

export interface QuizStudentsDetailState {
  data: QuizStudentData | null;
  status: QuizStudentsListStatus;
  error: string | null;
}
