import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchExpense } from "../../../../slices/expences/main/detail/thunk";

export function useExpenseShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesShow
  );

  const getExpense = useCallback(
    async (expenseId: number) => {
      const resultAction = await dispatch(fetchExpense(expenseId));
      if (fetchExpense.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { expense: data, status, error, getExpense };
}
