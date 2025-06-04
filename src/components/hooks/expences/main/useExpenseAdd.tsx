import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addExpense } from "../../../../slices/expences/main/add/thunk";
import { ExpenseAddPayload } from "../../../../types/expences/main/add";

export function useExpenseAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesAdd
  );

  const addNewExpense = useCallback(
    async (payload: ExpenseAddPayload) => {
      const resultAction = await dispatch(addExpense(payload));
      if (addExpense.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { addedExpense: data, status, error, addNewExpense };
}
