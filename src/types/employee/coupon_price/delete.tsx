import CouponPriceDeleteStatus from "../../../enums/employee/coupon_price/list";

export interface CouponPriceDeleteState {
  data: number | null;
  status: CouponPriceDeleteStatus;
  error: string | null;
}
