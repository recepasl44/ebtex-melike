import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchCreditCard } from "../../../slices/creditCard/detail/thunk";

export function useCreditCardShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.creditCardShow
  );

  const getCreditCard = useCallback(
    async (creditCardId: number) => {
      const resultAction = await dispatch(fetchCreditCard(creditCardId));
      if (fetchCreditCard.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { creditCard: data, status, error, getCreditCard };
}
