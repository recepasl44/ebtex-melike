import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { CouponPriceDeleteState } from "../../../../types/employee/coupon_price/delete";
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

export const deleteCouponPrice = createAsyncThunk<
  CouponPriceDeleteState["data"], // number | null
  number
>(
  "couponPrice/delete",
  async (couponPriceId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${COUPON_PRICE_BASE}/${couponPriceId}`);
      return resp.data.data; // number or null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete coupon price failed"
      );
    }
  }
);
