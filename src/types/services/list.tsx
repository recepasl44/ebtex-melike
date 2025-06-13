export interface IService {
  max_discount: any;
  id: number;
  school_type_id: number | null;
  service_type_id: number | null;
  branche_id: number | null;
  branche: {
    id: number;
    name: string;
    created_by: number;
    type: number | null;
  } | null;
  level_id: number | null;
  level: {
    id: number;
    program_id: number;
    program: {
      id: number;
      name: string;
      category_id: number;
      category: string;
    };
    name: string;
  } | null;
  course_id: number | null;
  course: {
    id: number;
    level_id: number;
    level: {
      id: number;
      program_id: number;
      program: {
        id: number;
        name: string;
        category_id: number;
        category: string;
      };
      name: string;
    };
    name: string;
  } | null;
  program_id: number | null;
  program: {
    id: number;
    name: string;
    category_id: number;
    category: string;
  } | null;
  type_id: number | null;
  type: any;
  start_installment_date: string;
  end_installment_date: string;
  name: string;
  price: string;
  is_main: number;
  max_installments: number;
  max_discounts: number;
  accept_discount: number;
  vat_rate: string;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ServiceListResponse {
  data: IService[];
  links: Links;
  meta: Meta;
}

export interface ServiceListArg {
  enabled?: boolean;
  [key: string]: any;
}
