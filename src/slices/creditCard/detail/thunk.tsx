import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CREDIT_CARD } from "../../../helpers/url_helper";
import { ICreditCard } from "../../../types/creditCard/list";

export const fetchCreditCard = createAsyncThunk<ICreditCard, number>(
  "creditCard/fetchCreditCard",
  async (creditCardId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${CREDIT_CARD}/${creditCardId}`
      );
      return response.data.data as ICreditCard;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch credit card failed"
      );
    }
  }
);
