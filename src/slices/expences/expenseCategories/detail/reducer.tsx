import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpenseCategories } from "./thunk";
import { ExpenseCategoriesShowState } from "../../../../types/expences/expenseCategories/show";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";

const initialState: ExpenseCategoriesShowState = {
  data: null,
  status: GetCategoriesListStatus.IDLE,
  error: null,
};

const expenseCategoriesShowSlice = createSlice({
  name: "expenseCategoriesShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseCategories.pending, (state) => {
        state.status = GetCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchExpenseCategories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchExpenseCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});
export default expenseCategoriesShowSlice.reducer;
