export interface StudentStep3Payload {
    discounts: number[];
    branch_id: number;
    services_final: number[];
    services_dates: string[];
    taxes: number[];
    fees: number[];
    advance_prices: number[];
    payment_methods: number[];
  }
  
  export interface StudentStep3Response {
    data: any;
  }
  
  export interface StudentStep3State {
    data: any | null;
    status: StudentStep3Status;
    error: string | null;
  }
  
  export enum StudentStep3Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  