import { SourceData } from './list';
import SourcesListStatus from '../../enums/sources/list';

export interface SourcesDeletePayload {
  id?: number;
}

export interface SourcesDeleteState {
  data: SourceData | null;
  status: SourcesListStatus;
  error: string | null;
}
