import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CouponPriceAddPayload,
  CouponPriceAddState,
} from "../../../../types/employee/coupon_price/add";
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

export const addCouponPrice = createAsyncThunk<
  CouponPriceAddState["data"], // Tekil coupon price
  CouponPriceAddPayload
>(
  "couponPrice/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${COUPON_PRICE_BASE}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add coupon price failed"
      );
    }
  }
);
