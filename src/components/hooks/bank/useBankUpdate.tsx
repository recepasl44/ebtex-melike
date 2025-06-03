import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateBank } from "../../../slices/bank/update/thunk";
import { BankUpdatePayload } from "../../../types/bank/update";

export function useBankUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.bankUpdate
  );

  const updateExistingBank = useCallback(
    async (payload: BankUpdatePayload) => {
      const resultAction = await dispatch(updateBank(payload));
      if (updateBank.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { updatedBank: data, status, error, updateExistingBank };
}
