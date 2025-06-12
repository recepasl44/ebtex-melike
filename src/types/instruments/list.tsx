import InstrumentsListStatus from "../../enums/instruments/list";


export interface Instrument {
    id: number;
    branch_id: number;
    document_type: number;
    document_owner_name: string;
    bank: string;
    amount: string;
    due_date: string;
    cirolar: any;
    check_no: string;
    transaction_no: string;
    guarantors: string;
    season: string;
    instrument_no: string;
    owner_name: string;
    school_no: number;
    bozdur_swap: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    image_path: string | null;
    status: string | null;
    receive_document_type?: string;
    receive_document_name?: string;

}

export interface InstrumentListMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number | null;
    to: number | null;
}

export interface InstrumentListResponse {
    data: Instrument[];
    meta: InstrumentListMeta;
    links?: any;
}
export interface InstrumentListState {
    data: Instrument[] | null;
    meta: InstrumentListMeta | null;
    status: InstrumentsListStatus;
    error: string | null;
}
export interface InstrumentListArgs{

    enabled?: boolean;
    [key: string]: any;



}
