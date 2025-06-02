import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateDiscount } from "../../../slices/discounts/update/thunk";
import { DiscountUpdatePayload } from "../../../types/discounts/update";

export function useDiscountUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.discountUpdate
  );

  const updateExistingDiscount = useCallback(
    async (payload: DiscountUpdatePayload) => {
      const resultAction = await dispatch(updateDiscount(payload));
      if (updateDiscount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedDiscount: data, status, error, updateExistingDiscount };
}
