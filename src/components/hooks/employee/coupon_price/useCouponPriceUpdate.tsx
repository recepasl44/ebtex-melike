import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateCouponPrice } from "../../../../slices/employee/coupon_price/update/thunk";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";
import {
  CouponPriceUpdatePayload,
  CouponPriceUpdateState,
} from "../../../../types/employee/coupon_price/update";

export function useCouponPriceUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.couponPriceUpdate
  ) as CouponPriceUpdateState;

  const updateExistingCouponPrice = useCallback(
    async (payload: CouponPriceUpdatePayload) => {
      const action = await dispatch(updateCouponPrice(payload));
      if (updateCouponPrice.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CouponPriceListStatus.LOADING;

  return {
    updatedCouponPrice: data,
    loading,
    error,
    updateExistingCouponPrice,
  };
}
