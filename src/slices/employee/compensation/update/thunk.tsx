import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CompensationUpdatePayload,
  CompensationUpdateState,
} from "../../../../types/employee/compensation/update";
import { COMPENSATION_BASE } from "../../../../helpers/url_helper";

export const updateCompensation = createAsyncThunk<
  CompensationUpdateState["data"], // Tekil Compensation
  CompensationUpdatePayload
>(
  "compensation/updateCompensation",
  async ({ compensationId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${COMPENSATION_BASE}/${compensationId}`,
        payload
      );
      return resp.data.data; // Updated Compensation
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update compensation failed"
      );
    }
  }
);
