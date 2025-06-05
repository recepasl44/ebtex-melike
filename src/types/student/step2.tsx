export interface StudentStep2Payload {
    type: string; // örn. "final"
    step: string; // örn. "2"
    services: number[];
    discounts: number[];
 
  }
  
  export interface StudentStep2Response {
    data: any;
  }
  
  export interface StudentStep2State {
    data: any | null;
    status: StudentStep2Status;
    error: string | null;
  }
  
  export enum StudentStep2Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  