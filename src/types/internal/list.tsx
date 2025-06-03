import InternalListStatus from '../../enums/internal/list';

export interface IInternalSummary {
    id: any;
    branche_id: string;
    all_registered: number;
    registered: number;
    next_season_registered: number;
    both_season_registered: number;
    success: string;
}

export interface InternalSummaryResponse {
    data: IInternalSummary;
}

export interface InternalSummaryState {
    data: IInternalSummary | null;
    status: InternalListStatus;
    error: string | null;
}
