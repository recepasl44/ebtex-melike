import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { Interruption } from "../../../../types/employee/interruption/list";
import { INTERRUPTION_BASE } from "../../../../helpers/url_helper";

export const fetchInterruptionDetail = createAsyncThunk<
  Interruption,
  number
>(
  "interruption/fetchDetail",
  async (interruptionId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${INTERRUPTION_BASE}/${interruptionId}`);
      return resp.data.data as Interruption;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch interruption detail failed"
      );
    }
  }
);
