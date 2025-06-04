import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { TRANSFERS } from "../../../helpers/url_helper";
import { TransferData } from "../../../types/transfers/list";
import { TransferAddPayload } from "../../../types/transfers/add";

export const addTransfer = createAsyncThunk<TransferData, TransferAddPayload>(
  "transfers/addTransfer",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(TRANSFERS, payload);
      return resp.data.data as TransferData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add transfer failed"
      );
    }
  }
);
