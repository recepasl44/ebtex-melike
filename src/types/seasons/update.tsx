import { Season } from './list';
import { SeasonListStatus } from '../../enums/seasons/list'
export interface SeasonsUpdatePayload {
    seasonId: number;
    payload: {
        name?: string;
        program_id?: number;
        season_number?: number;
        seasons?: Season[] | null;
    };
}
export interface SeasonsUpdateState {
    data: Season | null;
    status: SeasonListStatus;
    error: string | null;
}
