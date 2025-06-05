import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CREDIT_CARD } from "../../../helpers/url_helper";
import { CreditCardAddPayload } from "../../../types/creditCard/add";
import { ICreditCard } from "../../../types/creditCard/list";

export const addCreditCard = createAsyncThunk<
  ICreditCard,
  CreditCardAddPayload
>("creditCard/addCreditCard", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.post(CREDIT_CARD, payload);
    return resp.data.data as ICreditCard;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Add credit card failed"
    );
  }
});
