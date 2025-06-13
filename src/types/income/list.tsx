export interface IncomeData {
  service_type: string;
  receivable_amount: number;
  paid_amount: number;
  remaining_amount: number;
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