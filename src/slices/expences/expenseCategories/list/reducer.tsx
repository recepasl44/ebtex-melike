import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExpenseCategoriesListState,
  ExpenseCategoriesListResponse,
} from "../../../../types/expences/expenseCategories/list";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";
import { fetchExpenseCategoriesList } from "./thunk";

interface ExtendedExpenseCategoriesListState
  extends ExpenseCategoriesListState {
  fullResponse: ExpenseCategoriesListResponse | null;
}

const initialState: ExtendedExpenseCategoriesListState = {
  data: null,
  status: GetCategoriesListStatus.IDLE,
  error: null,
  fullResponse: null,
};

const expenseCategoriesListSlice = createSlice({
  name: "expenseCategoriesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseCategoriesList.pending, (state) => {
        state.status = GetCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchExpenseCategoriesList.fulfilled,
        (state, action: PayloadAction<ExpenseCategoriesListResponse>) => {
          state.status = GetCategoriesListStatus.SUCCEEDED;
          state.data = action.payload.data;
          // Store the full response including pagination data
          state.fullResponse = action.payload;
        }
      )
      .addCase(
        fetchExpenseCategoriesList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GetCategoriesListStatus.FAILED;
          state.error = action.payload || "Fetch expense categories failed";
        }
      );
  },
});

export default expenseCategoriesListSlice.reducer;
