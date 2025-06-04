import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { OPEN_ACCOUNT } from "../../../helpers/url_helper";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

export const fetchOpenAccount = createAsyncThunk<OpenAccountListStatus, number>(
  "openAccount/fetchOpenAccount",
  async (openAccountId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${OPEN_ACCOUNT}/${openAccountId}`
      );
      return response.data.data as OpenAccountListStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch open account failed"
      );
    }
  }
);
