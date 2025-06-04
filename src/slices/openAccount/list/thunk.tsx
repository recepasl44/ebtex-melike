import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { OPEN_ACCOUNT } from "../../../helpers/url_helper";
import {
  OpenAccountListResponse,
  OpenAccountListArgs,
} from "../../../types/openAccount/list";

export const fetchOpenAccountList = createAsyncThunk<
  OpenAccountListResponse,
  OpenAccountListArgs
>(
  "openAccount/fetchOpenAccountList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${OPEN_ACCOUNT}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as OpenAccountListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch open account failed"
      );
    }
  }
);
