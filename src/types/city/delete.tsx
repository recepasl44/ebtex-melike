export interface DeleteCityResponse {
    data: { id: number };
  }
  
  export interface DeleteCityState {
    data: { id: number } | null;
    status: DeleteCityStatus;
    error: string | null;
  }
  
  export enum DeleteCityStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  