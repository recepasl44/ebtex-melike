import { Question } from './list';
import {QuestionsListStatus} from '../../enums/questions/list'
export interface QuestionsAddPayload {
  writer_id: number;
  program_id: number;
  level_id: number;
  question_type_id: number;
  question_category_id: number;
  question_difficulty_id: number;
  page_type_id: number;
  page_position_id: number;
  suitability_score: number;
  relevance_id: number;
  pdf_id: number | null;
  video_solution_url: string | null;
  page_number: number | null;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
  image_path: string | null;
  curriculums: {
    lesson_ids: number[] | null;
    unit_ids: number[] | null;
    chapter_ids: number[] | null;
    topic_ids: number[] | null;
    achievement_ids: number[] | null;
  }[];
}

export interface QuestionsAddState {
  data: Question | null;
  status: QuestionsListStatus;
  error: string | null;
}
