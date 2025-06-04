export interface RegisterNoResponse {
    data: {
      register_no: string;
    };
  }
  
  export interface RegisterNoState {
    data: { register_no: string } | null;
    status: RegisterNoStatus;
    error: string | null;
  }
  
  export enum RegisterNoStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  