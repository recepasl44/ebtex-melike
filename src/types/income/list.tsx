export interface IncomeData {
    service_id: number;
    service_name: string;
    total_income: number;
    // Filtreye göre ek alanlar
    payment_date?: string;      // daily
    payment_month?: number;     // monthly
    payment_year?: number;      // monthly
    start_date?: string;        // period
    end_date?: string;          // period
  }
  
  export interface IncomeMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
  
  export interface ListIncomeResponse {
    data: IncomeData[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: IncomeMeta;
  }
  export interface IncomeListArgs {
    enabled?: boolean;
    [key: string]: any; 
  }