import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addExpenseCategories } from "../../../../slices/expences/expenseCategories/add/thunk";
import { ExpenseCategoryAddPayload } from "../../../../types/expences/expenseCategories/add";

export function useExpenseCategoryAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.getAddCategories
  );

  const addNewExpenseCategory = useCallback(
    async (payload: ExpenseCategoryAddPayload) => {
      const resultAction = await dispatch(addExpenseCategories(payload));
      if (addExpenseCategories.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { addedExpenseCategory: data, status, error, addNewExpenseCategory };
}
