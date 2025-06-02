import { SourceTypeData } from './list';
import SourceTypesListStatus from '../../enums/sourceTypes/list';

export interface SourceTypesDetailState {
    data: SourceTypeData | null;
    status: SourceTypesListStatus;
    error: string | null;
}
