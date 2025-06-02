import { data } from './list';
import {UnitsListStatus} from '../../enums/units/list'
export interface UnitsUpdatePayload {
    unitId: number;
    payload: {
        name: string;
        lesson_id?: number | null;
        cover?: string | null;
    };
}

export interface UnitsUpdateState {
    data: data | null;
    status: UnitsListStatus;
    error: string | null;
}
