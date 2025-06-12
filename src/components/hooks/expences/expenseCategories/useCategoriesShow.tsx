import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchExpenseCategories } from "../../../../slices/expences/expenseCategories/detail/thunk";

export function useCategoriesShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.getShowCategories
  );

  const getExpenseCategories = useCallback(
    async (expenseCategoryId: number) => {
      const resultAction = await dispatch(
        fetchExpenseCategories(expenseCategoryId)
      );
      console.log("Fetching expense categories with ID:", resultAction);
      if (fetchExpenseCategories.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { expenseCategories: data, status, error, getExpenseCategories };
}
