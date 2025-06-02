import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { OPEN_ACCOUNT } from "../../../helpers/url_helper";

export const deleteOpenAccount = createAsyncThunk<number, number>(
  "openAccount/deleteOpenAccount",
  async (openAccountId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${OPEN_ACCOUNT}/${openAccountId}`);
      return openAccountId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete open account failed"
      );
    }
  }
);
