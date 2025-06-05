export interface UpdateCountyPayload {
    name: string;
    city_id: number;
  }
  
  export interface UpdateCountyResponse {
    data: {
      id: number;
      name: string;
      city_id: number;
    };
  }
  
  export interface UpdateCountyState {
    data: UpdateCountyResponse['data'] | null;
    status: UpdateCountyStatus;
    error: string | null;
  }
  
  export enum UpdateCountyStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  