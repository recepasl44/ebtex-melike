export interface DeleteDistrictResponse {
    data: { id: number };
  }
  
  export interface DeleteDistrictState {
    data: { id: number } | null;
    status: DeleteDistrictStatus;
    error: string | null;
  }
  
  export enum DeleteDistrictStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  