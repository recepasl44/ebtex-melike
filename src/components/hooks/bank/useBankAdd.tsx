import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addBank } from "../../../slices/bank/add/thunk";
import { BankAddPayload } from "../../../types/bank/add";

export function useBankAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const bankAddState = useSelector((state: RootState) => state.bankAdd) || {};
  const { data, status, error } = bankAddState;

  const addNewBank = useCallback(
    async (payload: BankAddPayload) => {
      const resultAction = await dispatch(addBank(payload));
      if (addBank.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedBank: data,
    status,
    error,
    addNewBank,
  };
}
