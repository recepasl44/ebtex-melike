import { CityListStatus } from '../../enums/city/list';
export interface City {
  id: number;
  name: string;
  country_id: number;

  country: {
    id: number;
    name: string;
  } | null;
}

export interface CityListState {
  data: City[] | null;
  status: CityListStatus;
  error: string | null;
}

export interface CityListResponse {
  data: City[];
  links?: any;
  meta?: any;
}
export interface CityLListArg {
  enabled?: boolean;
  [key: string]: any;
}
