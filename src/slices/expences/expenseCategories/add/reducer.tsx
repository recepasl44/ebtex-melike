import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseCategoriesListState } from "../../../../types/expences/expenseCategories/list";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";
import { addExpenseCategories } from "./thunk";

const initialState: ExpenseCategoriesListState = {
  data: null,
  status: GetCategoriesListStatus.IDLE,
  error: null,
};

const expenseCategoriesAddSlice = createSlice({
  name: "expenseCategoriesAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseCategories.pending, (state) => {
        state.status = GetCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addExpenseCategories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addExpenseCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default expenseCategoriesAddSlice.reducer;
