export interface DailyDataDeleteState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  