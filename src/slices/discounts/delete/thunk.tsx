import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { DISCOUNTS } from "../../../helpers/url_helper";
import { DiscountDeleteState } from "../../../types/discounts/delete";

export const deleteDiscount = createAsyncThunk<DiscountDeleteState, number>(
  "discount/deleteDiscount",
  async (discountId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${DISCOUNTS}/${discountId}`);
      return resp.data as DiscountDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete discount failed"
      );
    }
  }
);
