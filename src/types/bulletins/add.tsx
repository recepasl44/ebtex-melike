import { data } from './list';
import { BulletinsListStatus } from '../../enums/bulletins/list';

export interface BulletinsAddPayload {
  id?: number;
  title: string;
  content: string;
  category_id: number;
  start_date: string;
  end_date: string;
  created_by: number;
  status: number;
  group_id: number;
}

export interface BulletinsAddState {
  data: data | null;
  status: BulletinsListStatus;
  error: string | null;
}
