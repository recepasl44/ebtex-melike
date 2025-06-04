import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExpenseSummaryState,
  ExpenseSummaryResponse,
} from "../../../types/expences/summary/getExpenseSummary";
import { ExpenseListStatus } from "../../../enums/expense/summary/list";
import { fetchExpenseSummary } from "./thunk";

const initialState: ExpenseSummaryState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseSummarySlice = createSlice({
  name: "expenseSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseSummary.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchExpenseSummary.fulfilled,
        (state, action: PayloadAction<ExpenseSummaryResponse>) => {
          state.status = ExpenseListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchExpenseSummary.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ExpenseListStatus.FAILED;
          state.error = action.payload || "Fetch expense summary failed";
        }
      );
  },
});

export default expenseSummarySlice.reducer;
