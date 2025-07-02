export interface QuizQuestionsListArg {
  enabled?: boolean;
  [key: string]: any;
}

export interface QuizQuestionsListItem {
  id: number;
  quiz_id: number;
  question_id: number;
  question_number: number;
  quiz: any;
  question: any;
}

export interface QuizQuestionsMeta {
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
}

export interface QuizQuestionsResponse {
  data: QuizQuestionsListItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: QuizQuestionsMeta;
}
