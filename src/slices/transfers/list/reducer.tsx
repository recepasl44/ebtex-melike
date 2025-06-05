import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransfers } from "./thunk";
import {
  ListTransferResponse,
  TransferData,
} from "../../../types/transfers/list";
import { TransferListStatus } from "../../../enums/transfers/list";

export interface TransferListState {
  data: ListTransferResponse["data"] | null;
  links: ListTransferResponse["first_page_url"] | null;
  meta: ListTransferResponse["meta"] | null;
  status: TransferListStatus;
  error: string | null;
  detail: TransferData | null;
}

const initialState: TransferListState = {
  data: null,
  links: null,
  meta: null,
  status: TransferListStatus.IDLE,
  error: null,
  detail: null,
};

const transferListSlice = createSlice({
  name: "transfers/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransfers.pending, (state) => {
      state.status = TransferListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchTransfers.fulfilled,
      (state, action: PayloadAction<ListTransferResponse>) => {
        state.status = TransferListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.first_page_url;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchTransfers.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = TransferListStatus.FAILED;
        state.error = action.payload || "Fetch transfers failed";
      }
    );
  },
});

export default transferListSlice.reducer;
