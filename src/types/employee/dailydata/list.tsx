export interface DailyDataItem {
    id: number;
    personel_id: number;
    year: number;
    month: number;
    day: number;
    ders_sayisi: number;
    soru_sayisi: number;
    ders_ucreti: string;
    platform_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface DailyDataListArgs {
    personel_id: number;
    year: number;
    month: number;
  }
  
  export interface DailyDataListState {
    data: DailyDataItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  