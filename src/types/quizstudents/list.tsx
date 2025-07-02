export interface QuizStudentData {
  id: number;
  quiz_id: number;
  quiz: any;
  student_id: number;
  student: any;
  status: any;
}

export interface QuizStudentsLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface QuizStudentsMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ListQuizStudentsResponse {
  data: QuizStudentData[];
  links: QuizStudentsLinks;
  meta: QuizStudentsMeta;
}

export interface QuizStudentsListArg {
  enabled?: boolean;
  [key: string]: any;
}
