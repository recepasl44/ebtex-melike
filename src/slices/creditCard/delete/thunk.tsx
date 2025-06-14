import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CREDIT_CARD } from "../../../helpers/url_helper";

export const deleteCreditCard = createAsyncThunk<number, number>(
  "creditCard/deleteCreditCard",
  async (creditCardId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${CREDIT_CARD}/${creditCardId}`);
      return creditCardId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete credit card failed"
      );
    }
  }
);
