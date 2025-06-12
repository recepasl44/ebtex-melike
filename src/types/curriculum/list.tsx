export interface AchievementDetail {
    id: number;
    achievement_id: number;
    score: number | null;
    difficulty_level: string | null;
    tests: string;
    lesson_duration: number | null;
    notes: string | null;
    platform_id: number | null;
    created_at: string;
    updated_at: string;
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
    achievement_detail: AchievementDetail;
  }
  
  export interface Topic {
    id: number;
    name: string;
    cover: string | null;
    chapter_id: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    numbering: string;
    achievements: Achievement[];
  }
  
  export interface Chapter {
    id: number;
    name: string;
    cover: string | null;
    unit_id: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    numbering: string;
    topics: Topic[];
  }
  
  export interface CurriculumData {
    id: number;
    name: string;
    cover: string | null;
    lesson_id: number | null;
    created_at: string;
    updated_at: string;
    platform_id: number;
    numbering: number;
    curriculum_type: string | null;
    chapters: Chapter[];
  }
  
  export interface CurriculumListResponse {
    data: CurriculumData[];
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
  
  export interface CurriculumListArg {

    enabled?: boolean;
    [key: string]: any;
  }
  