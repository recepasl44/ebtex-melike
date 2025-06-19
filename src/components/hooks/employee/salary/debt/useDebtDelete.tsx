import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { deleteDebit } from "../../../../../slices/employee/salary/debt/delete/thunk";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

export function useDebtDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.debitDelete
  );

  const deleteExistingDebt = useCallback(
    async (id: number) => {
      const action = await dispatch(deleteDebit(id));
      if (deleteDebit.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === DebitListStatus.LOADING;

  return {
    deletedDebt: data,
    loading,
    error,
    deleteExistingDebt,
  };
}
