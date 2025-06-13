import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { CouponPrice } from "../../../../types/employee/coupon_price/list";
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

export const fetchCouponPriceDetail = createAsyncThunk<
  CouponPrice, // Tekil veriyi döndüreceğiz
  number       // Arg: couponPriceId
>(
  "couponPrice/fetchDetail",
  async (couponPriceId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${COUPON_PRICE_BASE}/${couponPriceId}`);
      return resp.data.data as CouponPrice;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch coupon price detail failed"
      );
    }
  }
);
