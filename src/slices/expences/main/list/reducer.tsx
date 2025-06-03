import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExpenseListState,
  ExpenseListResponse,
} from "../../../../types/expences/main/list";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";
import { fetchExpenseList } from "./thunk";

const initialState: ExpenseListState = {
  data: null,
  status: ExpenseListStatus.IDLE,
  error: null,
};

const expenseListSlice = createSlice({
  name: "expenseList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseList.pending, (state) => {
        state.status = ExpenseListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchExpenseList.fulfilled,
        (state, action: PayloadAction<ExpenseListResponse>) => {
          state.status = ExpenseListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchExpenseList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ExpenseListStatus.FAILED;
          state.error = action.payload || "Fetch expenses failed";
        }
      );
  },
});

export default expenseListSlice.reducer;
