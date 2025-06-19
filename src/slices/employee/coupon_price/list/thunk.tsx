import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CouponPriceListResponse,
  CouponPriceListArgs,
} from "../../../../types/employee/coupon_price/list";
import { COUPON_PRICE_BASE } from "../../../../helpers/url_helper";

// Global cache key'lerini tutmak için bir Set
const couponRequestCache = new Set<string>();

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
  },
  {
    // Sonsuz istekleri engellemek için condition ekliyoruz
    condition: (params, {  }) => {
      const key = JSON.stringify(params);

      // Daha önce bu parametrelerle istek atıldıysa, tekrar gönderme
      if (couponRequestCache.has(key)) {
        return false;
      }

      // İlk kez geliyorsa cache'e ekle ve fetch'e izin ver
      couponRequestCache.add(key);
      return true;
    },
  }
);
