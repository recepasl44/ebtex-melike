import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { Compensation } from "../../../../types/employee/compensation/list";
import { COMPENSATION_BASE } from "../../../../helpers/url_helper";

export const fetchCompensationDetail = createAsyncThunk<
  Compensation, // success type
  number        // compensationId
>(
  "compensation/fetchDetail",
  async (compensationId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${COMPENSATION_BASE}/${compensationId}`);
      return resp.data.data as Compensation;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch compensation detail failed"
      );
    }
  }
);
