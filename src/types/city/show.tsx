export interface ICity {
    id: number;
    name: string;
    country_id: number;
  }
  
  export interface ShowCityResponse {
    [x: string]: string | number | ICity;
    id: number;
    cityName: string;
    countryId: number;
    data: ICity;
  }
  
  export interface ShowCityState {
    data: ICity | null;
    status: CityStatus;
    error: string | null;
  }
  
  export enum CityStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
  }
  