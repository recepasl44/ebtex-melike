import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { TRANSFERS } from "../../../helpers/url_helper";
import { TransferUpdatePayload } from "../../../types/transfers/update";
import { TransferData } from "../../../types/transfers/list";

export const updateTransfer = createAsyncThunk<
  TransferData,
  TransferUpdatePayload
>(
  "transfers/updateTransfer",
  async ({ transferId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${TRANSFERS}/${transferId}`,
        payload
      );
      return resp.data.data as TransferData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update transfer failed"
      );
    }
  }
);
