import type { Instrument } from './list';
import InstrumentsListStatus from '../../enums/instruments/list';

export interface InstrumentAddPayload {
    branch_id: number;
    document_type: number;
    supplier_id: number;
    document_owner_name: string;
    document_status: string;
    amount: number;
    due_date: string;
    bank: string;
    check_no: string,
    transaction_no: string;
    season: string;
    instrument_no: string;
    owner_name: string;
    receive_document_type: string;
    receive_document_name: string;
    guarantors: string;
    school_no: string | null;
    bozdur_swap: boolean;
    image_base: string;
}
export interface InstrumentAddState {
    data: Instrument | null;
    status: InstrumentsListStatus;
    error: string | null;
}
