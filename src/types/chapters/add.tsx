import { data } from './list';
import {ChaptersListStatus} from '../../enums/chapters/list'

export interface ChaptersAddPayload {
    name: string;
    unit_id: number;
    cover?: string | null;
}

export interface ChaptersAddState {
    data: data | null;
    status: ChaptersListStatus;
    error: string | null;
}
