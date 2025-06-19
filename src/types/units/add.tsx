import { data } from './list';
import {UnitsListStatus} from '../../enums/units/list'

export interface UnitsAddPayload {
    name: string;
    lesson_id: number | null;
    cover?: string | null;
}

export interface UnitsAddState {
    data: data | null;
    status: UnitsListStatus;
    error: string | null;
}
