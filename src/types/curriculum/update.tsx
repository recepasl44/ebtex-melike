import {CurriculumData} from './list';
import {CurriculumListStatus} from '../../enums/curriculum/list'
export interface CurriculumUpdatePayload {
    curriculumId: number;
    payload: {
      name: string;
      numbering: string;
    };
  }
  
  export interface CurriculumUpdateState {
    data: CurriculumData | null;
    status: CurriculumListStatus;
    error: string | null;
  }
  