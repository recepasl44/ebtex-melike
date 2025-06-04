import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { updateDebit } from "../../../../../slices/employee/salary/debt/update/thunk";
import { DebitUpdatePayload } from "../../../../../types/employee/salary/debit/update";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

export function useDebtUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.debitUpdate
  );

  const updateExistingDebt = useCallback(
    async (payload: DebitUpdatePayload) => {
      const action = await dispatch(updateDebit(payload));
      if (updateDebit.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === DebitListStatus.LOADING;

  return {
    updatedDebt: data,
    loading,
    error,
    updateExistingDebt,
  };
}
