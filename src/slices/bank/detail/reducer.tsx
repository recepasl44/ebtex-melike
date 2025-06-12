import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBank } from "./thunk";
import { BankShowState } from "../../../types/bank/show";
import { BankListStatus } from "../../../enums/bank/list";

const initialState: BankShowState = {
  data: null,
  status: BankListStatus.IDLE,
  error: null,
};

const bankShowSlice = createSlice({
  name: "bankShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBank.pending, (state) => {
        state.status = BankListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchBank.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchBank.rejected, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.FAILED;
        state.error = action.payload;
      });
  },
});
export default bankShowSlice.reducer;
