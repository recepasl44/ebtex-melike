import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCouponPriceList } from "./thunk";
import {
  CouponPriceListResponse,
  CouponPriceListState,
} from "../../../../types/employee/coupon_price/list";
import CouponPriceListStatus from "../../../../enums/employee/coupon_price/list";

const initialState: CouponPriceListState = {
  data: null,
  status: CouponPriceListStatus.IDLE,
  error: null,
};

const couponPriceListSlice = createSlice({
  name: "couponPrice/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponPriceList.pending, (state) => {
        state.status = CouponPriceListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCouponPriceList.fulfilled,
        (state, action: PayloadAction<CouponPriceListResponse>) => {
          state.status = CouponPriceListStatus.SUCCESS;
          state.data = action.payload.data; // CouponPrice[]
        }
      )
      .addCase(fetchCouponPriceList.rejected, (state, action: PayloadAction<any>) => {
        state.status = CouponPriceListStatus.ERROR;
        state.error = action.payload || "Fetch coupon price list failed";
      });
  },
});

export default couponPriceListSlice.reducer;
