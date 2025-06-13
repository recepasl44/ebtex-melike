import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDebitDetail } from "./thunk";
import { Debit } from "../../../../../types/employee/salary/debit/list";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

interface DebitShowState {
  data: Debit | null;
  status: DebitListStatus;
  error: string | null;
}

const initialState: DebitShowState = {
  data: null,
  status: DebitListStatus.IDLE,
  error: null,
};

const debitShowSlice = createSlice({
  name: "salary/debt/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebitDetail.pending, (state) => {
        state.status = DebitListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchDebitDetail.fulfilled, (state, action: PayloadAction<Debit>) => {
        state.status = DebitListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchDebitDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default debitShowSlice.reducer;
