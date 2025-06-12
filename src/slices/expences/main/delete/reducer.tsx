import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteExpence } from "./thunk";
import { IExpenseDeleteState } from "../../../../types/expences/main/delete";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";

const initialState: IExpenseDeleteState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseDeleteSlice = createSlice({
  name: "expenseDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteExpence.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteExpence.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = ExpenseListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deleteExpence.rejected, (state, action: PayloadAction<any>) => {
        state.status = ExpenseListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default expenseDeleteSlice.reducer;
