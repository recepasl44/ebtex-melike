import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  InterruptionUpdatePayload,
  InterruptionUpdateState,
} from "../../../../types/employee/interruption/update";
import { INTERRUPTION_BASE } from "../../../../helpers/url_helper";

export const updateInterruption = createAsyncThunk<
  InterruptionUpdateState["data"],
  InterruptionUpdatePayload
>(
  "interruption/update",
  async ({ interruptionId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${INTERRUPTION_BASE}/${interruptionId}`,
        payload
      );
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update interruption failed"
      );
    }
  }
);
