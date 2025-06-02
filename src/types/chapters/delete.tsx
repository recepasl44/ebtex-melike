import { data } from './list';
import {ChaptersListStatus} from '../../enums/chapters/list'
export interface ChaptersDeletePayload {
    id: number;
}

export interface ChaptersDeleteState {
    data: data | null;
    status: ChaptersListStatus;
    error: string | null;
}
