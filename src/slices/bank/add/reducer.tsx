import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addBank } from "./thunk";
import { BankAddState } from "../../../types/bank/add";
import { BankListStatus } from "../../../enums/bank/list";

const initialState: BankAddState = {
  data: null,
  status: BankListStatus.IDLE,
  error: null,
};

const bankAddSlice = createSlice({
  name: "bankAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBank.pending, (state) => {
        state.status = BankListStatus.LOADING;
        state.error = null;
      })
      .addCase(addBank.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addBank.rejected, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bankAddSlice.reducer;
