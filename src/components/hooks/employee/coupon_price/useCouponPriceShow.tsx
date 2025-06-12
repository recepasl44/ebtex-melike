import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchCouponPriceDetail } from "../../../../slices/employee/coupon_price/show/thunk";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";
import { CouponPrice } from "../../../../types/employee/coupon_price/list";

export function useCouponPriceShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.couponPriceShow
  );

  const getCouponPrice = useCallback(
    async (couponPriceId: number) => {
      const action = await dispatch(fetchCouponPriceDetail(couponPriceId));
      if (fetchCouponPriceDetail.fulfilled.match(action)) {
        return action.payload as CouponPrice;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CouponPriceListStatus.LOADING;

  return {
    couponPrice: data,
    loading,
    error,
    getCouponPrice,
  };
}
