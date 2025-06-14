import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { BANK } from "../../../helpers/url_helper";
import { BankListStatus } from "../../../enums/bank/list";

export const fetchBank = createAsyncThunk<BankListStatus, number>(
  "bank/fetchBank",
  async (bankId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BANK}/${bankId}`);
      return response.data.data as BankListStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch bank failed"
      );
    }
  }
);
