import { Season } from './list';
import SeasonListStatus from '../../enums/seasons/list'

export interface SeasonsAddPayload {
    name?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    status?: number;
    season_id?: number | null;
    seasons?: Season[] | null;
}

export interface SeasonsAddState {
    data: Season | null;
    status: SeasonListStatus;
    error: string | null;
}
