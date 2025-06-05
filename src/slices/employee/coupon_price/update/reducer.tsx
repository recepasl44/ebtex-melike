import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCouponPrice } from "./thunk";
import { CouponPriceUpdateState } from "../../../../types/employee/coupon_price/update";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";

const initialState: CouponPriceUpdateState = {
  data: null,
  status: CouponPriceListStatus.IDLE,
  error: null,
};

const couponPriceUpdateSlice = createSlice({
  name: "couponPriceUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCouponPrice.pending, (state) => {
        state.status = CouponPriceListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateCouponPrice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateCouponPrice.rejected, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default couponPriceUpdateSlice.reducer;
