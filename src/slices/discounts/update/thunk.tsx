import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { DiscountUpdatePayload } from "../../../types/discounts/update";
import { DiscountData } from "../../../types/discounts/list";
import { DISCOUNTS } from "../../../helpers/url_helper";

export const updateDiscount = createAsyncThunk<
  DiscountData,
  DiscountUpdatePayload
>(
  "discount/updateDiscount",
  async ({ discountId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${DISCOUNTS}/${discountId}`,
        payload
      );
      return resp.data.data as DiscountData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update discount failed"
      );
    }
  }
);
