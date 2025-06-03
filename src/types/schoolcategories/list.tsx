export interface SchoolCategoryData {
  id: number;
  name: string;
}

export interface SchoolCategoryLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface SchoolCategoryMeta {
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

export interface SchoolCategoriesListResponse {
  data: SchoolCategoryData[];
  links: SchoolCategoryLinks;
  meta: SchoolCategoryMeta;
}

export interface SchoolCategoriesListArg {
  enabled?: boolean;
  [key: string]: any;
}
