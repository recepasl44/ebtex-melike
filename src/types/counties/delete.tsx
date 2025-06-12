export interface DeleteCountyResponse {
    data: { id: number };
  }
  
  export interface DeleteCountyState {
    data: { id: number } | null;
    status: DeleteCountyStatus;
    error: string | null;
  }
  
  export enum DeleteCountyStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  