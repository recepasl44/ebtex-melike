import QuizzesListStatus from '../../enums/quizzes/list';

export interface QuizzesAddPayload {
  quiz_id: number;
  student_id: number;
  lesson_id: number;
  unit_id: number | null;
  chapter_id: number | null;
  topic_id: number | null;
  achievement_id: number | null;
  questions: number;
  corrects: number;
  wrongs: number;
  blanks: number;
  nets: string;
  success_rate: string | null;
}

export interface QuizzesAddResponse {
  id: number;
  quiz_id: number;
  student_id: number;
  lesson_id: number;
  unit_id: number | null;
  chapter_id: number | null;
  topic_id: number | null;
  achievement_id: number | null;
  questions: number;
  corrects: number;
  wrongs: number;
  blanks: number;
  nets: string;
  success_rate: string | null;
}

export interface QuizzesAddState {
  data: QuizzesAddResponse | null;
  status: QuizzesListStatus;
  error: string | null;
}
