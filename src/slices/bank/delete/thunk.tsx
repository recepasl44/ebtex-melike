import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { BANK } from "../../../helpers/url_helper";

export const deleteBank = createAsyncThunk<number, number>(
  "bank/deleteBank",
  async (bankId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${BANK}/${bankId}`);
      return bankId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete bank failed"
      );
    }
  }
);
