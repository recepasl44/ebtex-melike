import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransferDetail } from "./thunk";
import { TransferShowState } from "../../../types/transfers/show";
import { TransferListStatus } from "../../../enums/transfers/list";

const initialState: TransferShowState = {
  data: null,
  status: TransferListStatus.IDLE,
  error: null,
};

const transferShowSlice = createSlice({
  name: "transferShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferDetail.pending, (state) => {
        state.status = TransferListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchTransferDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchTransferDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default transferShowSlice.reducer;
