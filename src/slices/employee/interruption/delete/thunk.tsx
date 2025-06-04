import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { InterruptionDeleteStatate } from "../../../../types/employee/interruption/delete";
import { INTERRUPTION_BASE } from "../../../../helpers/url_helper";

export const deleteInterruption = createAsyncThunk<
  InterruptionDeleteStatate["data"],
  number
>(
  "interruption/delete",
  async (interruptionId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${INTERRUPTION_BASE}/${interruptionId}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete interruption failed"
      );
    }
  }
);
