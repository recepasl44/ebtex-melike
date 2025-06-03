import { Season } from './list';
import { SeasonListStatus } from '../../enums/seasons/list';

export interface SeasonShowState {
    data: Season | null;
    status: SeasonListStatus;
    error: string | null;
} 