import { QuizQuestionsListItem } from './list';
import { QuizQuestionsListStatus } from '../../enums/quizquestions/list';

export interface QuizQuestionsAddPayload extends QuizQuestionsListItem {
  id: number;
}

export interface QuizQuestionsAddState {
  data: QuizQuestionsListItem | null;
  status: QuizQuestionsListStatus;
  error: string | null;
}
