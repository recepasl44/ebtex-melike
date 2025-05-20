export interface DailyDataRowPayload {
    day: number;
    dersSayisi: number;
    soruSayisi: number;
    dersUcreti: number;
  }
  
  export interface SaveDailyDataPayload {
    personel_id: number;
    year: number;
    month: number;
    rows: DailyDataRowPayload[];
  }
  
  export interface DailyDataAddState {
    data: any; // adjust if API returns created rows
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  