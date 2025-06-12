import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateExpenseCategory } from "../../../../slices/expences/expenseCategories/update/thunk";
import { ExpenseCategoriesUpdatePayload } from "../../../../types/expences/expenseCategories/update";

export function useExpenseCategoryUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.getUpdateCategories
  );

  const updateExistingExpenseCategory = useCallback(
    async (payload: ExpenseCategoriesUpdatePayload) => {
      const resultAction = await dispatch(updateExpenseCategory(payload));
      if (updateExpenseCategory.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return {
    updatedExpenseCategory: data,
    status,
    error,
    updateExistingExpenseCategory,
  };
}
