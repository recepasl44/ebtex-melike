import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateTransfer } from "./thunk";
import { TransferUpdateState } from "../../../types/transfers/update";
import { TransferListStatus } from "../../../enums/transfers/list";

const initialState: TransferUpdateState = {
  data: null,
  status: TransferListStatus.IDLE,
  error: null,
};

const transferUpdateSlice = createSlice({
  name: "transferUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTransfer.pending, (state) => {
        state.status = TransferListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateTransfer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = TransferListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(updateTransfer.rejected, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default transferUpdateSlice.reducer;
