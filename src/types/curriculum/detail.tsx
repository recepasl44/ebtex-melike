import {CurriculumData} from './list';
import {CurriculumListStatus} from '../../enums/curriculum/list'
export interface CurriculumDetailState {
    data: CurriculumData | null;
    status: CurriculumListStatus;
    error: string | null;
  }
  