import { SourceData } from './list';
import SourcesListStatus from '../../enums/sources/list';

export interface SourcesAddPayload extends SourceData {
  id: number;
}

export interface SourcesAddState {
  data: SourceData | null;
  status: SourcesListStatus;
  error: string | null;
}
