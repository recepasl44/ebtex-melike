import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { DISCOUNTS } from "../../../helpers/url_helper";
import { DiscountData } from "../../../types/discounts/list";

export const fetchDiscount = createAsyncThunk<DiscountData, number>(
  "discount/fetchDiscount",
  async (discountId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${DISCOUNTS}/${discountId}`);
      return resp.data.data as DiscountData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch discount failed"
      );
    }
  }
);
