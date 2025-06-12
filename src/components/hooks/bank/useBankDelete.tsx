import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteBank } from "../../../slices/bank/delete/thunk";

export function useBankDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.bankDelete
  );

  const removeBank = useCallback(
    async (bankId: number) => {
      const resultAction = await dispatch(deleteBank(bankId));
      if (deleteBank.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedBankId: data, status, error, removeBank };
}
