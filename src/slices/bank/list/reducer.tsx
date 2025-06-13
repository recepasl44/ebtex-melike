import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankListState, BankListResponse } from "../../../types/bank/list";
import { BankListStatus } from "../../../enums/bank/list";
import { fetchBankList } from "./thunk";

const initialState: BankListState = {
  data: null,
  status: BankListStatus.IDLE,
  error: null,
};

const bankListSlice = createSlice({
  name: "bankList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankList.pending, (state) => {
        state.status = BankListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchBankList.fulfilled,
        (state, action: PayloadAction<BankListResponse>) => {
          state.status = BankListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchBankList.rejected, (state, action: PayloadAction<any>) => {
        state.status = BankListStatus.FAILED;
        state.error = action.payload || "Fetch banks failed";
      });
  },
});

export default bankListSlice.reducer;
