export interface AddCountyPayload {
    name: string;
    city_id: number;
  }
  
  export interface AddCountyResponse {
    data: {
      id: number;
      name: string;
      city_id: number;
    };
  }
  
  export interface AddCountyState {
    data: AddCountyResponse['data'] | null;
    status: AddCountyStatus;
    error: string | null;
  }
  
  export enum AddCountyStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  