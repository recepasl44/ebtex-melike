import { QuizQuestionsListItem } from './list';
import { QuizQuestionsListStatus } from '../../enums/quizquestions/list';

export interface QuizQuestionsDetailState {
  data: QuizQuestionsListItem | null;
  status: QuizQuestionsListStatus;
  error: string | null;
}
