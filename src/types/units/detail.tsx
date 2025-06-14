import { data } from './list';
import {UnitsListStatus} from '../../enums/units/list'
export interface UnitShowState {
    data: data | null;
    status: UnitsListStatus;
    error: string | null;
}
