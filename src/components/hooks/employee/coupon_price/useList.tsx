import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchCouponPriceList } from "../../../../slices/employee/coupon_price/list/thunk";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";
import { CouponPrice } from "../../../../types/employee/coupon_price/list";

interface UseCouponPriceListArgs {
  enabled?: boolean;
  [key: string]: any;
}

export function useCouponPriceList(params: UseCouponPriceListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.couponPriceList
  );

 const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchCouponPriceList({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams]);

  const couponPrices: CouponPrice[] = data || [];
  const loading = status === CouponPriceListStatus.LOADING;

  return {
    couponPrices,
    loading,
    error,
  };
}
