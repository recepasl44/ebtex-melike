import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateBank } from "./thunk";
import { BankUpdateState } from "../../../types/bank/update";
import { BankListStatus } from "../../../enums/bank/list";

const initialState: BankUpdateState = {
  data: null,
  status: BankListStatus.IDLE,
  error: null,
};

const bankUpdateSlice = createSlice({
  name: "bankUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBank.pending, (state) => {
        state.status = BankListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateBank.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateBank.rejected, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bankUpdateSlice.reducer;
