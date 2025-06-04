import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchDiscount } from "../../../slices/discounts/show/thunk";

export function useDiscountDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.discountShow
  );

  const getDiscount = useCallback(
    async (discountId: number) => {
      const resultAction = await dispatch(fetchDiscount(discountId));
      if (fetchDiscount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { discount: data, status, error, getDiscount };
}
