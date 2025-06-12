import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpense } from "./thunk";
import { ExpenseShowState } from "../../../../types/expences/main/show";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";

const initialState: ExpenseShowState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseShowSlice = createSlice({
  name: "expenseShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchExpense.rejected, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.FAILED;
        state.error = action.payload;
      });
  },
});
export default expenseShowSlice.reducer;
