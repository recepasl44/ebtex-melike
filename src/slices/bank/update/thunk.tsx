import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { BANK } from "../../../helpers/url_helper";
import { BankUpdatePayload } from "../../../types/bank/update";
import { IBank } from "../../../types/bank/list";

export const updateBank = createAsyncThunk<IBank, BankUpdatePayload>(
  "bank/updateBank",
  async ({ bankId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${BANK}/${bankId}`, payload);
      return resp.data.data as IBank;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update bank failed"
      );
    }
  }
);
