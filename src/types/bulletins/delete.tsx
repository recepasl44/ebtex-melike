import { data } from './list';
import { BulletinsListStatus } from '../../enums/bulletins/list';

export interface BulletinsDeletePayload {
  id?: number;
}

export interface BulletinsDeleteState {
  data: data | null;
  status: BulletinsListStatus;
  error: string | null;
}
