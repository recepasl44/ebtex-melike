import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteDebit } from "./thunk";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

interface DebitDeleteInternalState {
  data: number | null;
  status: DebitListStatus;
  error: string | null;
}

const initialState: DebitDeleteInternalState = {
  data: null,
  status: DebitListStatus.IDLE,
  error: null,
};

const debitDeleteSlice = createSlice({
  name: "salary/debt/delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDebit.pending, (state) => {
        state.status = DebitListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteDebit.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteDebit.rejected, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default debitDeleteSlice.reducer;
