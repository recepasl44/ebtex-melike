import { CouponPrice } from "./list";
import CouponPriceListStatus from "../../../enums/employee/coupon_price/list";

export interface CouponPriceShowState {
  data: CouponPrice | null;
  status: CouponPriceListStatus;
  error: string | null;
}
