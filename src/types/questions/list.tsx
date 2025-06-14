export interface Writer {
    id: number;
    full_name: string;
    created_at: string;
    updated_at: string;
    platform_id: number;
  }
  
  export interface Level {
    id: number;
    program_id: number;
    program: {
      id: number;
      name: string;
      category_id: number;
      category: string;
    };
    name: string;
  }
  
  export interface QuestionType {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface QuestionDifficulty {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
  }
  
  export interface PageType {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
  }
  
  export interface PagePosition {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
  }
  
  export interface Relevance {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
  }
  
  export interface Curriculum {
    id: number;
    question_id: number;
    lesson_id: number;
    unit_id: number;
    chapter_id: number;
    topic_id: number;
    achievement_id: number;
    repetition: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
  }
  
  export interface Question {
    id: number;
    writer_id: number;
    writer: Writer;
    program_id: number;
    program: any | null;
    level_id: number;
    level: Level;
    question_type_id: number;
    question_type: QuestionType;
    question_category_id: number;
    question_category: any | null;
    question_difficulty_id: number;
    question_difficulty: QuestionDifficulty;
    page_type_id: number;
    page_type: PageType;
    page_position_id: number;
    page_position: PagePosition;
    suitability_score: number;
    relevance_id: number;
    relevance: Relevance;
    question_curriculums: Curriculum[];
    pdf_id: number | null;
    pdf: any | null;
    video_solution_url: string | null;
    page_number: number | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
    image_path: string | null;
    curriculums: Curriculum[];
  }
  
  export interface ListQuestionsResponse {
    data: Question[];
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
  
  export interface QuestionsListArg {
    enabled?: boolean;
    [key: string]: any;
  }
  