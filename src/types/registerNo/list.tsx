
export interface IRegisterNo {
    register_no: string;
  }
  
  export enum RegisterNoStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
  }
  
  export interface RegisterNoState {
    data: IRegisterNo | null;
    status: RegisterNoStatus;
    error: string | null;
  }
  