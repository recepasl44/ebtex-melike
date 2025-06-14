import { Instrument } from './list';
import InstrumentsListStatus from '../../enums/instruments/list';

export interface InstrumentShowState {
    data: Instrument | null;
    status: InstrumentsListStatus;
    error: string | null;
}
