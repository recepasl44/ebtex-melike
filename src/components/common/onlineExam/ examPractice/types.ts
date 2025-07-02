
export interface QuestionData {
  id: number;
  quiz_question_status: string;
  image_path: string;
}

export interface Lesson {
  id: number;
  name: string;
  questions: QuestionData[];
}

export interface QuizStatus {
  lesson_name: string;
  question_number: number;
  response: number;
  reminder: number;
  start_time: string;
  end_time: string;
  quiz_time: string;
  elapsed_time: string;
  reminder_time: string;
  average_time: string;
}

export interface ExamData {
  lessons: Lesson[];
  quiz_status: QuizStatus[];
}

// API Response types for useQuizQuestionsTable
export interface ApiQuestion {
  id: number;
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
  image_path: string;
  curriculums: any[];
}

export interface ApiQuizQuestion {
  id: number;
  quiz_id: number;
  question_id: number;
  question: ApiQuestion;
  question_number: number;
  quiz: any; // Quiz details
}

export interface ApiResponse {
  data: ApiQuizQuestion[];
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
    per_page: number;
    to: number;
    total: number;
  };
}

export interface Question {
  id: number;
  imageUrl?: string; 
  subject: string;
  status?: string;
}