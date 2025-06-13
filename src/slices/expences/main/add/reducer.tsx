import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addExpense } from "./thunk";
import { ExpenseAddState } from "../../../../types/expences/main/add";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";

const initialState: ExpenseAddState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseAddSlice = createSlice({
  name: "expenseAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addExpense.rejected, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default expenseAddSlice.reducer;
