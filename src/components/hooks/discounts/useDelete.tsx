import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteDiscount } from "../../../slices/discounts/delete/thunk";

export function useDiscountDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.discountDelete
  );

  const deleteExistingDiscount = useCallback(
    async (discountId: number) => {
      const resultAction = await dispatch(deleteDiscount(discountId));
      if (deleteDiscount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedDiscount: data, status, error, deleteExistingDiscount };
}
