import QuizzesListStatus from '../../enums/quizzes/list';
import { QuizListItem } from './list';

export interface QuizzesDetailState {
  data: QuizListItem | null;
  status: QuizzesListStatus;
  error: string | null;
}
