import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCouponPrice } from "./thunk";
import { CouponPriceDeleteState } from "../../../../types/employee/coupon_price/delete";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";

const initialState: CouponPriceDeleteState = {
  data: null,
  status: CouponPriceListStatus.IDLE,
  error: null,
};

const couponPriceDeleteSlice = createSlice({
  name: "couponPriceDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCouponPrice.pending, (state) => {
        state.status = CouponPriceListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteCouponPrice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteCouponPrice.rejected, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default couponPriceDeleteSlice.reducer;
