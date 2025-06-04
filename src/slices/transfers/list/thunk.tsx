import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { TRANSFERS } from "../../../helpers/url_helper";
import {
  ListTransferResponse,
  TransferListArg,
} from "../../../types/transfers/list";

export const fetchTransfers = createAsyncThunk<
  ListTransferResponse,
  TransferListArg
>("transfers/fetchTransfers", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${TRANSFERS}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as ListTransferResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch Transfer failed"
    );
  }
});
