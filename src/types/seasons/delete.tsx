import { Season } from './list';
import { SeasonListStatus } from '../../enums/seasons/list';

export interface SeasonsDeletePayload {
    id: number;
}
export interface SeasonsDeleteState {
    data: Season | null;
    status: SeasonListStatus;
    error: string | null;
}