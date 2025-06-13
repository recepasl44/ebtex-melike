import { SourceData } from './list';
import SourcesListStatus from '../../enums/sources/list';

export interface SourcesUpdatePayload {
  sourceId: number;
  payload: Omit<SourceData, 'id'>;
}

export interface SourcesUpdateState {
  data: SourceData | null;
  status: SourcesListStatus;
  error: string | null;
}
