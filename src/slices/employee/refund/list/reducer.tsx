// F:\xintra_react_ts\src\slices\employee\refund\list\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RefundListResponse,
  RefundListState,
} from "../../../../types/employee/refund/list";
import { fetchRefundList } from "./thunk";
import RefundListStatus from "../../../../enums/employee/refund/list";

const initialState: RefundListState = {
  data: null,
  status: RefundListStatus.IDLE,
  error: null,
};

const refundListSlice = createSlice({
  name: "refund/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefundList.pending, (state) => {
        state.status = RefundListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchRefundList.fulfilled,
        (state, action: PayloadAction<RefundListResponse>) => {
          state.status = RefundListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchRefundList.rejected, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.ERROR;
        state.error = action.payload || "Fetch refund list failed";
      });
  },
});

export default refundListSlice.reducer;
