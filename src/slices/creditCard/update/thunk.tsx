import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CREDIT_CARD } from "../../../helpers/url_helper";
import { CreditCardUpdatePayload } from "../../../types/creditCard/update";
import { ICreditCard } from "../../../types/creditCard/list";

export const updateCreditCard = createAsyncThunk<
  ICreditCard,
  CreditCardUpdatePayload
>(
  "creditCard/updateCreditCard",
  async ({ creditCardId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${CREDIT_CARD}/${creditCardId}`,
        payload
      );
      return resp.data.data as ICreditCard;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update credit card failed"
      );
    }
  }
);
