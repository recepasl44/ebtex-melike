import { data } from './list';
import {TopicsListStatus} from '../../enums/topics/list'
export interface TopicShowState {
    data: data | null;
    status: TopicsListStatus;
    error: string | null;
}
