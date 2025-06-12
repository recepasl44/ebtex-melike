import { SchoolListStatus } from "../../enums/schools/list";

export interface ISchool {
  id: number;
  name: string;
  country_id?: number;
  country?: {
    id: number;
    name: string;
  };
  city_id?: number;
  city?: {
    country_id: number;
    country: {
      id: number;
      name: string;
    };
    name: string;
  };
  county_id?: number;
  county?: {
    id: number;
    name: string;
  };
  code?: string;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  fax?: string;
  additional_information?: string;
  type_id?: number;
  type?: {
    id: number;
    name: string;
  };
}

export interface SchoolListMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface SchoolListResponse {
  data: ISchool[];
  meta: SchoolListMeta;
  links?: any;
}

export interface SchoolListState {
  data: ISchool[] | null;
  meta: SchoolListMeta | null;
  status: SchoolListStatus;
  error: string | null;
}

export interface SchoolListArg {
  enabled?: boolean;
  [key: string]: any;
}
