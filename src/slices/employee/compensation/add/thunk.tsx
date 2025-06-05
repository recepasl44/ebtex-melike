import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  compensationAddPayload,
  compensationAddState,
} from "../../../../types/employee/compensation/add";
import { COMPENSATION_BASE } from "../../../../helpers/url_helper";

export const addCompensation = createAsyncThunk<
  compensationAddState["data"], 
  compensationAddPayload
>(
  "compensation/addCompensation",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${COMPENSATION_BASE}`, payload);
      return resp.data.data; // Tekil Compensation
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add compensation failed"
      );
    }
  }
);
