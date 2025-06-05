import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { BANK } from "../../../helpers/url_helper";
import { BankListResponse, BankListArgs } from "../../../types/bank/list";

export const fetchBankList = createAsyncThunk<BankListResponse, BankListArgs>(
  "bank/fetchBankList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${BANK}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as BankListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch bank list failed"
      );
    }
  }
);
