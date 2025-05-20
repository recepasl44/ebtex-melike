import { data } from "../courses/list";

export interface ICounty {
  id: number;
  name: string;
  city_id: number;

}

export interface ListCountyResponse {
  data: County[] | data | null;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
  };
}

export interface County {
  id: number;
  name: string;
  city_id: number;
  city: {
    id: number;
    country_id: number;
    country: {
      id: number;
      name: string;
    };
    name: string;
  };
  data:any
}

// İlçe listesinin durumunu takip etmek için enum.
export enum CountyListStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

// İlçe listesi için state tipi.
export interface CountyListState {
  data: County[] | data | null;
  status: CountyListStatus;
  error: string | null;
}
export interface CountyLListArg {
  enabled?: boolean;
  [key: string]: any;
}
