import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCouponPriceDetail } from "./thunk";
import { CouponPrice } from "../../../../types/employee/coupon_price/list";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";

export interface CouponPriceShowState {
  data: CouponPrice | null;
  status: CouponPriceListStatus;
  error: string | null;
}

const initialState: CouponPriceShowState = {
  data: null,
  status: CouponPriceListStatus.IDLE,
  error: null,
};

const couponPriceShowSlice = createSlice({
  name: "couponPrice/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponPriceDetail.pending, (state) => {
        state.status = CouponPriceListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCouponPriceDetail.fulfilled,
        (state, action: PayloadAction<CouponPrice>) => {
          state.status = CouponPriceListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchCouponPriceDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.ERROR;
        state.error = action.payload || "Fetch coupon price detail failed";
      });
  },
});

export default couponPriceShowSlice.reducer;
