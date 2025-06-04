import { Question } from './list';
import {QuestionsListStatus} from '../../enums/questions/list'

export interface QuestionsDeletePayload {
  id: number;
}

export interface QuestionsDeleteState {
  data: Question | null;
  status: QuestionsListStatus;
  error: string | null;
}
