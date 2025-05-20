import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteExpenseCategories } from "./thunk";
import { IExpenseCategoryDeleteState } from "../../../../types/expences/expenseCategories/delete";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";

const initialState: IExpenseCategoryDeleteState = {
  data: null,
  status: GetCategoriesListStatus.IDLE,
  error: null,
};

const expenseCategoryDeleteSlice = createSlice({
  name: "expenseCategoryDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteExpenseCategories.pending, (state) => {
        state.status = GetCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteExpenseCategories.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = GetCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteExpenseCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default expenseCategoryDeleteSlice.reducer;
