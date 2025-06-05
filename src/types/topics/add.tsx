import { data } from './list';
import {TopicsListStatus} from '../../enums/topics/list'
export interface TopicsAddPayload {
    name: string;
    chapter_id: number;
    cover?: string | null;
}

export interface TopicsAddState {
    data: data | null;
    status: TopicsListStatus;
    error: string | null;
}
