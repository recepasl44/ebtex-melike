import { data } from './list';
import {TopicsListStatus} from '../../enums/topics/list'
export interface TopicsDeletePayload {
    id: number;
}

export interface TopicsDeleteState {
    data: data | null;
    status: TopicsListStatus;
    error: string | null;
}
