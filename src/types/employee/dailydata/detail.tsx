import { DailyDataItem } from "./list";

export interface DailyDataDetailState {
  data: DailyDataItem | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
