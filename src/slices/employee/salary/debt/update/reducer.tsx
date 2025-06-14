import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateDebit } from "./thunk";
import { DebitUpdateState } from "../../../../../types/employee/salary/debit/update";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

const initialState: DebitUpdateState = {
  data: null,
  status: DebitListStatus.IDLE,
  error: null,
};

const debitUpdateSlice = createSlice({
  name: "salary/debt/update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDebit.pending, (state) => {
        state.status = DebitListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateDebit.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateDebit.rejected, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default debitUpdateSlice.reducer;
