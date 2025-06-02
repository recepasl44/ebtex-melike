// F:\xintra_react_ts\src\slices\employee\salary\debt\add\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebitAddState } from "../../../../../types/employee/salary/debit/add";
import { addDebit } from "./thunk";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

const initialState: DebitAddState = {
  data: null,
  status: DebitListStatus.IDLE,
  error: null,
};

const debitAddSlice = createSlice({
  name: "salary/debt/add",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDebit.pending, (state) => {
        state.status = DebitListStatus.LOADING;
        state.error = null;
      })
      .addCase(addDebit.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addDebit.rejected, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default debitAddSlice.reducer;
