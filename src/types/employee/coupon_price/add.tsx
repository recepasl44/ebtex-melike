import CouponPriceListStatus from "../../../enums/employee/coupon_price/list";
import { CouponPrice } from "./list";

export interface CouponPriceAddPayload {
  personel_id: number;
  tarih: string;
  urun_adi: string;
  urun_turu: string;
  satis_ucreti: string;
  kupon_yuzdesi: string;
  gelir: string;
}

export interface CouponPriceAddState {
  data: CouponPrice | null;
  status: CouponPriceListStatus;
  error: string | null;
}
