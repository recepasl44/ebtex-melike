import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { TRANSFERS } from "../../../helpers/url_helper";
import { TransferData } from "../../../types/transfers/list";

export const fetchTransferDetail = createAsyncThunk<TransferData, number>(
  "transfers/fetchTransfer",
  async (transferId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${TRANSFERS}/${transferId}`);
      return response.data.data as TransferData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch transfer failed"
      );
    }
  }
);
