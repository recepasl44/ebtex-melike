import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CompensationListResponse,
  CompensationListArgs,
} from "../../../../types/employee/compensation/list";
// Örneğin "/employee/compensation"
import { COMPENSATION_BASE } from "../../../../helpers/url_helper"; 

export const fetchCompensationList = createAsyncThunk<
  CompensationListResponse,
  CompensationListArgs
>(
  "compensation/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const response = await axiosInstance.get(
        `${COMPENSATION_BASE}/index?${query.toString()}`
      );
      return response.data as CompensationListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch compensation list failed"
      );
    }
  }
);
