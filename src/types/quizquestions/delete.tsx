import { QuizQuestionsListItem } from './list';
import { QuizQuestionsListStatus } from '../../enums/quizquestions/list';

export interface QuizQuestionsDeletePayload {
  id: number;
}

export interface QuizQuestionsDeleteState {
  data: QuizQuestionsListItem | null;
  status: QuizQuestionsListStatus;
  error: string | null;
}
