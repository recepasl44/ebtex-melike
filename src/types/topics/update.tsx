import { data } from './list';
import {TopicsListStatus} from '../../enums/topics/list'
export interface TopicsUpdatePayload {
    topicId: number;
    payload: {
        name: string;
        chapter_id?: number | null;
        cover?: string | null;
    };
}

export interface TopicsUpdateState {
    data: data | null;
    status: TopicsListStatus;
    error: string | null;
}
