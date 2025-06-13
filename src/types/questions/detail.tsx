import { Question } from './list';
import {QuestionsListStatus} from '../../enums/questions/list'

export interface QuestionShowState {
  data: Question | null;
  status: QuestionsListStatus;
  error: string | null;
}
