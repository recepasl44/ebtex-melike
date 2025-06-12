import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCouponPrice } from "./thunk";
import { CouponPriceAddState } from "../../../../types/employee/coupon_price/add";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";

const initialState: CouponPriceAddState = {
  data: null,
  status: CouponPriceListStatus.IDLE,
  error: null,
};

const couponPriceAddSlice = createSlice({
  name: "couponPriceAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCouponPrice.pending, (state) => {
        state.status = CouponPriceListStatus.LOADING;
        state.error = null;
      })
      .addCase(addCouponPrice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addCouponPrice.rejected, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default couponPriceAddSlice.reducer;
