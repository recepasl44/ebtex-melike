import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateExpenseCategory } from "./thunk";
import { ExpenseCategoriesUpdateState } from "../../../../types/expences/expenseCategories/update";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";

const initialState: ExpenseCategoriesUpdateState = {
  data: null,
  status: GetCategoriesListStatus.IDLE,
  error: null,
};

const expenseCategoriesUpdateSlice = createSlice({
  name: "expenseCategoriesUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateExpenseCategory.pending, (state) => {
        state.status = GetCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateExpenseCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateExpenseCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default expenseCategoriesUpdateSlice.reducer;
