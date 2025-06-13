import { data } from './list';
import {ChaptersListStatus} from '../../enums/chapters/list'
export interface ChapterShowState {
    data: data | null;
    status: ChaptersListStatus;
    error: string | null;
}
