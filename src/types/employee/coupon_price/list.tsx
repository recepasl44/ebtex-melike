import CouponPriceListStatus from "../../../enums/employee/coupon_price/list";

export interface CouponPrice {
  id: number;
  personel_id: number;
  tarih: string;
  urun_turu: string;
  urun_adi: string;
  satis_ucreti: string;
  kupon_yuzdesi: string;
  gelir: string;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CouponPriceListPaginate {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: ILink[];
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface CouponPriceListResponse {
  data: CouponPrice[];
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface CouponPriceListState {
  data: CouponPrice[] | null;
  status: CouponPriceListStatus;
  error: string | null;
}

export interface CouponPriceListArgs {
  enabled?: boolean;
  [key: string]: any;
}
