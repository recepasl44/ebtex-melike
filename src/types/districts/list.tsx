export interface IDistrict {
  id: number;
  county_id: number;
  county: {
    id: number;
    name: string;
    city_id: number;
    city: { id: number; country_id: number; country: { id: number; name: string }; name: string };
  };
  name: string;
}

export interface ListDistrictResponse {
  data: IDistrict;
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
export interface DistrictListArg {
  enabled?: boolean;
  [key: string]: any;
}
