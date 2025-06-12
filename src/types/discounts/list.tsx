export interface DiscountService {
  id: number;
  branche_id: number | null;
  branche: any | null;
  level_id: number | null;
  level: any | null;
  course_id: number | null;
  course: any | null;
  program_id: number | null;
  program: any | null;
  type_id: number | null;
  type: any | null;
  start_installment_date: string | null;
  end_installment_date: string | null;
  name: string;
  price: string;
  is_main: number | null;
  max_installments: number | null;
  max_discounts: number | null;
  accept_discount: number | null;
  vat_rate: string;
}

export interface DiscountData {
  id: number;
  name: string;
  is_seasonal: number | null;
  type: number | null;
  discount_type: number | null;
  service_id: number | null;
  service: DiscountService | null;
  amount: string;
}

export interface DiscountLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface DiscountMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface DiscountMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: DiscountMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface DiscountListResponse {
  data: DiscountData[];
  links: DiscountLinks;
  meta: DiscountMeta;
}

export interface DiscountListArg {
  enabled?: boolean;
  [key: string]: any;
}
