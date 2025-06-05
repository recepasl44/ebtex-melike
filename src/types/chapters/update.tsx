import { data } from './list';
import {ChaptersListStatus} from '../../enums/chapters/list'
export interface ChaptersUpdatePayload {
    chapterId: number;
    payload: {
        name: string;
        unit_id?: number | null;
        cover?: string | null;
    };
}

export interface ChaptersUpdateState {
    data: data | null;
    status: ChaptersListStatus;
    error: string | null;
}
