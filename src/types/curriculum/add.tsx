import {CurriculumData} from './list';
import {CurriculumListStatus} from '../../enums/curriculum/list'
export interface CurriculumAddPayload {
    curriculum_type: string;
    unit: {
      name: string;
      numbering: string;
    };
    chapters: {
      name: string;
      numbering: string;
      topics: {
        name: string;
        numbering: string;
        achievements: {
          name: string;
          numbering: string;
          achievement_detail: {
            score: number | null;
            lesson_duration: number | null;
            difficulty_level: string | null;
            tests: string;
            notes: string | null;
          };
        }[];
      }[];
    }[];
  }
  
  export interface CurriculumAddState {
    data: CurriculumData | null;
    status: CurriculumListStatus;
    error: string | null;
  }
  