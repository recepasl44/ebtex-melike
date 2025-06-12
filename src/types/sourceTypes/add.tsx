import { SourceTypeData } from './list';
import SourceTypesListStatus from '../../enums/sourceTypes/list';

export interface SourceTypesAddPayload {
    id: number;
    name: string;
}

export interface SourceTypesAddState {
    data: SourceTypeData | null;
    status: SourceTypesListStatus;
    error: string | null;
}
