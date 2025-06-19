// F:\xintra_react_ts\src\slices\employee\refund\show\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRefundDetail } from "./thunk";
import { Refund } from "../../../../types/employee/refund/list";
import RefundListStatus from "../../../../enums/employee/refund/list";

interface RefundShowState {
  data: Refund | null;
  status: RefundListStatus;
  error: string | null;
}

const initialState: RefundShowState = {
  data: null,
  status: RefundListStatus.IDLE,
  error: null,
};

const refundShowSlice = createSlice({
  name: "refund/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefundDetail.pending, (state) => {
        state.status = RefundListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchRefundDetail.fulfilled,
        (state, action: PayloadAction<Refund>) => {
          state.status = RefundListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchRefundDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default refundShowSlice.reducer;
