import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteCreditCard } from "../../../slices/creditCard/delete/thunk";

export function useCreditCardDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.creditCardDelete
  );

  const removeCreditCard = useCallback(
    async (creditCardId: number) => {
      const resultAction = await dispatch(deleteCreditCard(creditCardId));
      if (deleteCreditCard.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { deletedCreditCardId: data, status, error, removeCreditCard };
}
