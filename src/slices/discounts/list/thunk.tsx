import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { DISCOUNTS } from "../../../helpers/url_helper";
import {
  DiscountListResponse,
  DiscountListArg,
} from "../../../types/discounts/list";

export const fetchDiscounts = createAsyncThunk<
  DiscountListResponse,
  DiscountListArg
>("discount/fetchDiscounts", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "enabled") {
        query.append(key, String(value));
      }
    });
    const url = `${DISCOUNTS}?${query.toString()}`;
    const resp = await axiosInstance.get(url);
    return resp.data as DiscountListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch discounts failed"
    );
  }
});
