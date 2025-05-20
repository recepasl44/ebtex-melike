import { data } from './list';
import {UnitsListStatus} from '../../enums/units/list'
export interface UnitsDeletePayload {
    id: number;
}

export interface UnitsDeleteState {
    data: data | null;
    status: UnitsListStatus;
    error: string | null;
}
