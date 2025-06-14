import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  InterruptionListResponse,
  InterruptionListArgs,
} from "../../../../types/employee/interruption/list";
import { INTERRUPTION_BASE } from "../../../../helpers/url_helper"; 

export const fetchInterruptionList = createAsyncThunk<
  InterruptionListResponse,
  InterruptionListArgs
>(
  "interruption/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const resp = await axiosInstance.get(
        `${INTERRUPTION_BASE}/index?${query.toString()}`
      );
      return resp.data as InterruptionListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch interruption list failed"
      );
    }
  }
);
