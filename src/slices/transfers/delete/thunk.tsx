import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { TRANSFERS } from "../../../helpers/url_helper";

export const deleteTransfer = createAsyncThunk<number, number>(
  "transfers/deleteTransfer",
  async (transferId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${TRANSFERS}/${transferId}`);
      return transferId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete transfer failed"
      );
    }
  }
);
