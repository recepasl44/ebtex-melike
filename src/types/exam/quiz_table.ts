export interface QuizTableProps {
  quiz_type: string;
  quiz_type_id: number;
  platform_id: number;
  platform: Platform;
  student: Student;
  quizzes: Quiz[];
  booklets: Booklet[];
  main_quiz_date: string;
  results: Result[];
  points: Point[];
  global_joined_number: GlobalJoinedNumber;
  global_success_ordered: GlobalSuccessOrdered;
  graphic_data: GraphicDaum[];
}

export interface Platform {
  post_code: string;
  name: string;
  city: string;
  county: string;
}

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  identity_no: string;
  class_id: number;
  class_name: string;
}

export interface Quiz {
  sub_quiz_id: number;
  sub_quiz_name: string;
}

export interface Booklet {
  id: number;
  name: string;
}

export interface Result {
  quiz_id: number;
  quiz_name: string;
  lessons: Lesson[];
}

export interface Lesson {
  lesson_id: number;
  lesson_name: string;
  questions: number;
  correct: number;
  wrong: number;
  empty: number;
  net: number;
  class_average_net: number;
  class_net_comparison: string;
  branch_net: number;
  general_net: number;
}

export interface Point {
  point_type_id: number;
  point_type_name: string;
  point: number;
  success_ordered?: SuccessOrdered;
  joined_number?: JoinedNumber;
  global_success_ordered?: GlobalSuccessOrdered;
  global_joined_number?: GlobalJoinedNumber;
}

export interface SuccessOrdered {
  class?: number;
  branch?: number;
  county?: number;
  city?: number;
  general?: number;
}

export interface JoinedNumber {
  class?: number | string | null;
  branch?: number | string | null;
  county?: number  | string | null;
  city?: number  | string | null;
  general?: number | string | null;
}

export interface GlobalJoinedNumber {
  class: number;
  branch: number;
  county: number;
  city: number;
  general: number;
}

export interface GlobalSuccessOrdered {
  class?: number;
  branch?: number;
  county?: number;
  city?: number;
  general?: number;
}

export interface GraphicDaum {
  lesson_id: number;
  lesson_name: string;
  total_students: number;
  average_score: number;
  top_score: number;
}

export type Question = {
  question_no: number;
  achievement: string;
  correct_answer: string;
  example_answer: string;
  solution: string;
};

export type TestResult = {
  name: string;
  results: Question[];
};
