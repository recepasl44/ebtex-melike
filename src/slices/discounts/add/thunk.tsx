import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { DISCOUNTS } from "../../../helpers/url_helper";
import { DiscountAddPayload } from "../../../types/discounts/add";
import { DiscountData } from "../../../types/discounts/list";

export const addDiscount = createAsyncThunk<DiscountData, DiscountAddPayload>(
  "discount/addDiscount",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(DISCOUNTS, payload);
      return resp.data.data as DiscountData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add discount failed"
      );
    }
  }
);
