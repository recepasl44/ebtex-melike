import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addDiscount } from "../../../slices/discounts/add/thunk";
import { DiscountAddPayload } from "../../../types/discounts/add";

export function useDiscountAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.discountAdd
  );

  const addNewDiscount = useCallback(
    async (payload: DiscountAddPayload) => {
      const resultAction = await dispatch(addDiscount(payload));
      if (addDiscount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedDiscount: data, status, error, addNewDiscount };
}
