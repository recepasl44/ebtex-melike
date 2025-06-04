import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTransfer } from "./thunk";
import { TransferDeleteState } from "../../../types/transfers/delete";
import { TransferListStatus } from "../../../enums/transfers/list";

const initialState: TransferDeleteState = {
  data: null,
  status: TransferListStatus.IDLE,
  error: null,
};

const transferDeleteSlice = createSlice({
  name: "transferDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransfer.pending, (state) => {
        state.status = TransferListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteTransfer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = TransferListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deleteTransfer.rejected, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default transferDeleteSlice.reducer;
