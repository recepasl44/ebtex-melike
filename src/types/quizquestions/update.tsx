import { QuizQuestionsListItem } from './list';
import { QuizQuestionsListStatus } from '../../enums/quizquestions/list';

export interface QuizQuestionsUpdatePayload {
  quizQuestionId: number;
  payload: Partial<QuizQuestionsListItem>;
}

export interface QuizQuestionsUpdateState {
  data: QuizQuestionsListItem | null;
  status: QuizQuestionsListStatus;
  error: string | null;
}
