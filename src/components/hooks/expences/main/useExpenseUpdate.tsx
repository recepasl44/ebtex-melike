import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateExpense } from "../../../../slices/expences/main/update/thunk";
import { ExpenseUpdatePayload } from "../../../../types/expences/main/update";

export function useExpenseUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesUpdate
  );

  const updateExistingExpense = useCallback(
    async (payload: ExpenseUpdatePayload) => {
      const resultAction = await dispatch(updateExpense(payload));
      if (updateExpense.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { updatedExpense: data, status, error, updateExistingExpense };
}
