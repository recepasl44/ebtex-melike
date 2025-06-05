import { SourceData } from './list';
import SourcesListStatus from '../../enums/sources/list';

export interface SourcesDetailState {
    data: SourceData | null;
    status: SourcesListStatus;
    error: string | null;
}
