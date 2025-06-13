
import InstrumentDeleteStatus from '../../enums/instruments/list';

export interface InstrumentDeleteState {
    data: number | null;
    status: InstrumentDeleteStatus;
    error: string | null;
}
