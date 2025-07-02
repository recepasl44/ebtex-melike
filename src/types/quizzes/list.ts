import QuizzesListStatus from '../../enums/quizzes/list';
import { IStudent } from '../student/list';

export interface QuizType {
  id: number;
  name: string;
  penalty_rate: string | null;
}

export interface Platform {
  id: number;
  name: string;
  country: string;
  city: string;
  county: string;
}

export interface Branche {
  id: number;
  name: string;
  created_by: number;
  type: number;
}

export interface LessonResult {
  lesson_id: number;
  lesson_name: string;
  questions: number;
  corrects: number;
  wrongs: number;
  blanks: number;
  nets: string;
  class_average_net: string;
  class_net_comparison: string;
  branch_net: number;
  general_net: number;
}

export interface ResultItem {
  quiz_id: number;
  quiz_name: string;
  lessons: LessonResult[];
}

export interface QuizListItem {
  id: number;
  is_parent: any;
  quiz_type_id: number;
  quiz_type: QuizType | null;
  quiz_no: string;
  short_name: string;
  quiz_name: string;
  quiz_id: number | null;
  quiz: any;
  platform: Platform;
  student: IStudent;
  quizzes: { id: number; quiz_name: string }[];
  quiz_date: string;
  results: ResultItem[];
  branche_id: number;
  branche: Branche;
  question_type_id: any;
  question_type: any;
  quiz_category_id: number;
  quiz_category: any;
  point_type_id: number;
  point_type: any;
  period_id: any;
  period: any;
  level_id: number | null;
  level: any;
  wrong_right: any;
  topic_achievement: any;
  total_questions: number;
  is_print: any;
  source_id: any;
  source: any;
  source_type_id: any;
  source_type: any;
  result_publish_datetime: any;
  participants: number;
  is_repeat: boolean;
  repeat_reason: string;
  status: number;
}

export interface QuizzesListResponse {
  data: QuizListItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface QuizzesListArg {
  enabled?: boolean;
  [key: string]: any;
}

export interface QuizzesListState {
  data: QuizListItem[] | null;
  links: QuizzesListResponse['links'] | null;
  meta: QuizzesListResponse['meta'] | null;
  status: QuizzesListStatus;
  error: string | null;
}
