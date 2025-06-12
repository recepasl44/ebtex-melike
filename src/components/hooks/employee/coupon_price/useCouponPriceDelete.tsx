import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteCouponPrice } from "../../../../slices/employee/coupon_price/delete/thunk";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";
import { CouponPriceDeleteState } from "../../../../types/employee/coupon_price/delete";

export function useCouponPriceDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.couponPriceDelete
  ) as CouponPriceDeleteState;

  const deleteExistingCouponPrice = useCallback(
    async (couponPriceId: number) => {
      const action = await dispatch(deleteCouponPrice(couponPriceId));
      if (deleteCouponPrice.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CouponPriceListStatus.LOADING;

  return {
    deletedCouponPrice: data,
    loading,
    error,
    deleteExistingCouponPrice,
  };
}
