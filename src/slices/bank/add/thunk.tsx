import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { BANK } from "../../../helpers/url_helper";
import { BankAddPayload } from "../../../types/bank/add";
import { IBank } from "../../../types/bank/list";

export const addBank = createAsyncThunk<IBank, BankAddPayload>(
  "bank/addBank",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(BANK, payload);
      return resp.data.data as IBank;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Add bank failed");
    }
  }
);
