import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteBank } from "./thunk";
import { IBankDeleteState } from "../../../types/bank/delete";
import { BankListStatus } from "../../../enums/bank/list";

const initialState: IBankDeleteState = {
  data: null,
  status: BankListStatus.IDLE,
  error: null,
};

const bankDeleteSlice = createSlice({
  name: "bankDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBank.pending, (state) => {
        state.status = BankListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteBank.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = BankListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteBank.rejected, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bankDeleteSlice.reducer;
