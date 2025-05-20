export interface IDistrict {
    id: number;
    name: string;
    county_id: number;
  }
  
  export interface ShowDistrictResponse {
    data: IDistrict;
  }
  
  export interface ShowDistrictState {
    data: IDistrict | null;
    status: DistrictStatus;
    error: string | null;
  }
  
  export enum DistrictStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  