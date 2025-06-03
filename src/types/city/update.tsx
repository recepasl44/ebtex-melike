export interface UpdateCityPayload {
    name: string;
    country_id: number;
  }
  
  export interface UpdateCityResponse {
    data: {
      id: number;
      name: string;
      country_id: number;
    };
  }
  
  export interface UpdateCityState {
    data: UpdateCityResponse['data'] | null;
    status: UpdateCityStatus;
    error: string | null;
  }
  
  export enum UpdateCityStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  