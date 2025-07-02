import { QuestionCurriculumData } from './list';
import QuestionCurriculumsListStatus from '../../enums/questioncurriculums/list';

export interface QuestionCurriculumsUpdatePayload {
  questionCurriculumId: number;
  payload: {
    question_id?: number;
    lesson_id?: number;
    unit_id?: number;
    chapter_id?: number;
    topic_id?: number;
    achievement_id?: number;
    repetition?: number | null;
    status?: number;
  };
}

export interface QuestionCurriculumsUpdateState {
  data: QuestionCurriculumData | null;
  status: QuestionCurriculumsListStatus;
  error: string | null;
}
