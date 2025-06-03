  export interface ServicetypesData {
    id: number;
    name: string;
  }

  export interface ServicetypesLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  }

  export interface ServicetypesMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }

  export interface ServicetypesListResponse {
    data: ServicetypesData[];
    links: ServicetypesLinks;
    meta: ServicetypesMeta;
  }

  export interface ServicetypesListArg {
    enabled?: boolean;
    [key: string]: any;
  }
