import { CouponPrice } from "./list";
import CouponPriceListStatus from "../../../enums/employee/coupon_price/list";

export interface CouponPriceUpdatePayload {
  couponPriceId: number;
  payload: {
    personel_id: number;
    tarih: string;
    urun_adi: string;
    urun_turu: string;
    satis_ucreti: string;
    kupon_yuzdesi: string;
    gelir: string;
  };
}

export interface CouponPriceUpdateState {
  data: CouponPrice | null;
  status: CouponPriceListStatus;
  error: string | null;
}
