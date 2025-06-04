import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteExpenseCategories } from "../../../../slices/expences/expenseCategories/delete/thunk";

export function useExpenseCategoryDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.getDeleteCategories
  );

  const deleteExpenseCategory = useCallback(
    async (expenseCategoryId: number) => {
      const resultAction = await dispatch(
        deleteExpenseCategories(expenseCategoryId)
      );
      if (deleteExpenseCategories.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return {
    deletedExpenseCategoryId: data,
    status,
    error,
    deleteExpenseCategory,
  };
}
