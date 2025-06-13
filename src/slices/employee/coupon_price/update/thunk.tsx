import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CouponPriceUpdatePayload,
  CouponPriceUpdateState,
} from "../../../../types/employee/coupon_price/update";
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

export const updateCouponPrice = createAsyncThunk<
  CouponPriceUpdateState["data"], // Tekil coupon price
  CouponPriceUpdatePayload
>(
  "couponPrice/update",
  async ({ couponPriceId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${COUPON_PRICE_BASE}/${couponPriceId}`,
        payload
      );
      return resp.data.data; // Updated
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update coupon price failed"
      );
    }
  }
);
