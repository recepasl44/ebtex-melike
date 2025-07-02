import { QuestionCurriculumData } from './list';
import QuestionCurriculumsListStatus from '../../enums/questioncurriculums/list';

export interface QuestionCurriculumsDeletePayload {
  id?: number;
}

export interface QuestionCurriculumsDeleteState {
  data: QuestionCurriculumData | null;
  status: QuestionCurriculumsListStatus;
  error: string | null;
}
