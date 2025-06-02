import { SourceTypeData } from './list';
import SourceTypesListStatus from '../../enums/sourceTypes/list';

export interface SourceTypesDeletePayload {
    id?: number;
}

export interface SourceTypesDeleteState {
    data: SourceTypeData | null;
    status: SourceTypesListStatus;
    error: string | null;
}
