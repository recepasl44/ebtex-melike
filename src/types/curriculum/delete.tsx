
import {CurriculumData} from './list';
import {CurriculumListStatus} from '../../enums/curriculum/list'
export interface CurriculumDeletePayload {
    id?: number;
  }
  
  export interface CurriculumDeleteState {
    data: CurriculumData | null;
    status: CurriculumListStatus;
    error: string | null;
  }
  