import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addCreditCard } from "../../../slices/creditCard/add/thunk";
import { CreditCardAddPayload } from "../../../types/creditCard/add";

export function useCreditCardAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const creditCardAddState =
    useSelector((state: RootState) => state.creditCardAdd) || {};
  const { data, status, error } = creditCardAddState;

  const addNewCreditCard = useCallback(
    async (payload: CreditCardAddPayload) => {
      const resultAction = await dispatch(addCreditCard(payload));
      if (addCreditCard.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedCreditCard: data,
    status,
    error,
    addNewCreditCard,
  };
}
