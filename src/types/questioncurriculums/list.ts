import QuestionCurriculumsListStatus from '../../enums/questioncurriculums/list';

export interface Question {
  id: number;
  writer_id: number;
  program_id: number;
  level_id: number;
  question_category_id: number;
  question_difficulty_id: number;
  question_type_id: number;
  page_type_id: number;
  page_position_id: number;
  suitability_score: number;
  relevance_id: number;
  video_solution_url: string | null;
  pdf_id: number | null;
  page_number: number | null;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
  image_path: string;
  created_at: string | null;
  updated_at: string | null;
  platform_id: number;
  places_use_id: number | null;
  difficulty_level_id: number | null;
  exam_type_id: number | null;
}

export interface Lesson {
  id: number;
  name: string;
  cover: string | null;
  area_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface Unit {
  id: number;
  name: string;
  cover: string | null;
  lesson_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: number;
  curriculum_type: string | null;
}

export interface Chapter {
  id: number;
  name: string;
  cover: string | null;
  unit_id: number | null;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string | null;
}

export interface Topic {
  id: number;
  name: string;
  cover: string | null;
  chapter_id: number | null;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string | null;
}

export interface Achievement {
  id: number;
  name: string;
  cover: string | null;
  topic_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
  numbering: string;
}

export interface QuestionCurriculumData {
  id: number;
  question_id: number;
  question: Question;
  lesson_id: number;
  lesson: Lesson;
  unit_id: number;
  unit: Unit;
  chapter_id: number;
  chapter: Chapter;
  topic_id: number;
  topic: Topic;
  achievement_id: number;
  achievement: Achievement;
  repetition: number | null;
  status: number;
}

export interface QuestionCurriculumsListResponse {
  data: QuestionCurriculumData[];
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

export interface QuestionCurriculumsListArg {
  enabled?: boolean;
  [key: string]: any;
}
