export interface AddDistrictPayload {
    name: string;
    county_id: number;
  }
  
  export interface AddDistrictResponse {
    data: {
      id: number;
      name: string;
      county_id: number;
    };
  }
  
  export interface AddDistrictState {
    data: AddDistrictResponse['data'] | null;
    status: AddDistrictStatus;
    error: string | null;
  }
  
  export enum AddDistrictStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  