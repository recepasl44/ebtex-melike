import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CREDIT_CARD } from "../../../helpers/url_helper";
import {
  CreditCardListResponse,
  CreditCardListArgs,
} from "../../../types/creditCard/list";

export const fetchCreditCardList = createAsyncThunk<
  CreditCardListResponse,
  CreditCardListArgs
>(
  "creditCard/fetchCreditCardList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${CREDIT_CARD}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as CreditCardListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch credit card list failed"
      );
    }
  }
)
