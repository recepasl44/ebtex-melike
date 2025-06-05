import { Instrument } from "./list";
import InstrumentsListStatus from "../../enums/instruments/list";


export interface InstrumentUpdatePayload {
    instrumentId: number;
    payload: {
        branch_id?: number;
        document_type?: number;
        document_owner_name?: string;
        bank?: string;
        amount?: string;
        due_date?: string;
        cirolar?: any;
        check_no?: string;
        transaction_no?: string;
        guarantors?: string;
        season?: string;
        instrument_no?: string;
        owner_name?: string;
        school_no?: number;
        document_status?: string;
        bozdur_swap?: boolean;
        image_base64?: string;
        status?: string | null;
        receive_document_type?: string;
        receive_document_type_name?: string;
    };
}


export interface InstrumentUpdateState {
    data: Instrument | null;
    status: InstrumentsListStatus;
    error: string | null;
}

