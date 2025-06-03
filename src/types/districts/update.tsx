export interface UpdateDistrictPayload {
    name: string;
    county_id: number;
  }
  
  export interface UpdateDistrictResponse {
    data: {
      id: number;
      name: string;
      county_id: number;
    };
  }
  
  export interface UpdateDistrictState {
    data: UpdateDistrictResponse['data'] | null;
    status: UpdateDistrictStatus;
    error: string | null;
  }
  
  export enum UpdateDistrictStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  