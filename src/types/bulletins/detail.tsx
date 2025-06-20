import { data } from './list';
import { BulletinsListStatus } from '../../enums/bulletins/list';

export interface BulletinShowState {
  data: data | null;
  status: BulletinsListStatus;
  error: string | null;
}
