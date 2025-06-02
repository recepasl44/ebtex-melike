export interface ICounty {
    id: number;
    name: string;
    city_id: number;
  }
  
  export interface ShowCountyResponse {
      id: number;
      name: string;
      city_id: number;
      data: ICounty;
    }
  
  export interface ShowCountyState {
    data: ICounty | null;
    status: CountyStatus;
    error: string | null;
  }
  
  export enum CountyStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  