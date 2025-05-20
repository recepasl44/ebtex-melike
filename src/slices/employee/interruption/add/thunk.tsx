import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  InterruptionAddPayload,
  InterruptionAddState,
} from "../../../../types/employee/interruption/add";
import { INTERRUPTION_BASE } from "../../../../helpers/url_helper";

export const addInterruption = createAsyncThunk<
  InterruptionAddState["data"], // Tekil interruption
  InterruptionAddPayload
>(
  "interruption/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(INTERRUPTION_BASE, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add interruption failed"
      );
    }
  }
);
