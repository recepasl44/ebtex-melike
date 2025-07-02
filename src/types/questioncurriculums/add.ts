import { QuestionCurriculumData } from './list';
import QuestionCurriculumsListStatus from '../../enums/questioncurriculums/list';

export interface QuestionCurriculumsAddPayload {
  id?: number;
  question_id: number;
  lesson_id: number;
  unit_id: number;
  chapter_id: number;
  topic_id: number;
  achievement_id: number;
  repetition?: number | null;
  status: number;
}

export interface QuestionCurriculumsAddState {
  data: QuestionCurriculumData | null;
  status: QuestionCurriculumsListStatus;
  error: string | null;
}
