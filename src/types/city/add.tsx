export interface AddCityPayload {
    name: string;
    country_id: number;
  }
  
  export interface AddCityResponse {
    data: {
      id: number;
      name: string;
      country_id: number;
    };
  }
  
  export interface AddCityState {
    data: AddCityResponse['data'] | null;
    status: AddCityStatus;
    error: string | null;
  }
  
  export enum AddCityStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  