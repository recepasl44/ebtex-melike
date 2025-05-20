import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  SalaryListResponse,
  SalaryListArgs,
} from "../../../../types/employee/salary/list";
import { SALARY } from "../../../../helpers/url_helper";

export const fetchSalaryList = createAsyncThunk<
  SalaryListResponse,
  SalaryListArgs
>(
  "salary/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(
        `${SALARY}/index?${query.toString()}`
      );
      return resp.data as SalaryListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch salary list failed"
      );
    }
  }
);
