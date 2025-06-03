import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateExpense } from "./thunk";
import { ExpenseUpdateState } from "../../../../types/expences/main/update";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";

const initialState: ExpenseUpdateState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseUpdateSlice = createSlice({
  name: "expenseUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateExpense.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateExpense.rejected, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default expenseUpdateSlice.reducer;
