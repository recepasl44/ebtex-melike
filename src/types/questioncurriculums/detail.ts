import { QuestionCurriculumData } from './list';
import QuestionCurriculumsListStatus from '../../enums/questioncurriculums/list';

export interface QuestionCurriculumsDetailState {
  data: QuestionCurriculumData | null;
  status: QuestionCurriculumsListStatus;
  error: string | null;
}
