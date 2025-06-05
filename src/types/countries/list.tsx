// src/types/countries/list.ts

import { CountryListStatus } from "../../enums/countries/list";


export interface ICountry {
  id: number;
  name: string;
}


export interface CountryListMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}


export interface CountryListResponse {
  data: ICountry[];
  meta: CountryListMeta;
  links?: any;
}


export interface CountryListState {
  data: ICountry[] | null;
  meta: CountryListMeta | null;
  status: CountryListStatus;
  error: string | null;
}


export interface CountryListArg {
  enabled?: boolean;
  [key: string]: any;
}
