import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addCouponPrice } from "../../../../slices/employee/coupon_price/add/thunk";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";
import {
  CouponPriceAddPayload,
  CouponPriceAddState,
} from "../../../../types/employee/coupon_price/add";

export function useCouponPriceAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.couponPriceAdd
  ) as CouponPriceAddState;

  const addNewCouponPrice = useCallback(
    async (payload: CouponPriceAddPayload) => {
      const resultAction = await dispatch(addCouponPrice(payload));
      if (addCouponPrice.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CouponPriceListStatus.LOADING;

  return {
    addedCouponPrice: data,
    loading,
    error,
    addNewCouponPrice,
  };
}
