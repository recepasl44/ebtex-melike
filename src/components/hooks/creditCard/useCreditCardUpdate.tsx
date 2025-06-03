import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateCreditCard } from "../../../slices/creditCard/update/thunk";
import { CreditCardUpdatePayload } from "../../../types/creditCard/update";

export function useCreditCardUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.creditCardUpdate
  );

  const updateExistingCreditCard = useCallback(
    async (payload: CreditCardUpdatePayload) => {
      const resultAction = await dispatch(updateCreditCard(payload));
      if (updateCreditCard.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { updatedCreditCard: data, status, error, updateExistingCreditCard };
}
