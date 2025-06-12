import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchBank } from "../../../slices/bank/detail/thunk";

export function useBankShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.bankShow
  );

  const getBank = useCallback(
    async (bankId: number) => {
      const resultAction = await dispatch(fetchBank(bankId));
      if (fetchBank.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { bank: data, status, error, getBank };
}
