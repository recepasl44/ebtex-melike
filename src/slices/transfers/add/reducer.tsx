import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTransfer } from "./thunk";
import { TransferAddState } from "../../../types/transfers/add";
import { TransferListStatus } from "../../../enums/transfers/list";

const initialState: TransferAddState = {
  data: null,
  status: TransferListStatus.IDLE,
  error: null,
};

const transferAddSlice = createSlice({
  name: "transferAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransfer.pending, (state) => {
        state.status = TransferListStatus.LOADING;
        state.error = null;
      })
      .addCase(addTransfer.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addTransfer.rejected, (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default transferAddSlice.reducer;
