import { SourceTypeData } from './list';
import SourceTypesListStatus from '../../enums/sourceTypes/list';

export interface SourceTypesUpdatePayload {
    sourceTypeId: number;
    payload: {
        name?: string;
    };
}

export interface SourceTypesUpdateState {
    data: SourceTypeData | null;
    status: SourceTypesListStatus;
    error: string | null;
}
