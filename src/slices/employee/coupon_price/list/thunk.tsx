import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CouponPriceListResponse,
  CouponPriceListArgs,
} from "../../../../types/employee/coupon_price/list";
// Varsayalım endpoint: /employee/coupon-price
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

export const fetchCouponPriceList = createAsyncThunk<
  CouponPriceListResponse,
  CouponPriceListArgs
>(
  "couponPrice/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(
        `${COUPON_PRICE_BASE}/index?${query.toString()}`
      );
      return resp.data as CouponPriceListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch coupon price list failed"
      );
    }
  }
);
