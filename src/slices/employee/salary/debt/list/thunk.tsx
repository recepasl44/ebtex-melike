import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import {
  DebitListResponse,
  DebitListArgs,
} from "../../../../../types/employee/salary/debit/list";
import { SALARY_DEBT_BASE } from "../../../../../helpers/url_helper";

export const fetchDebitList = createAsyncThunk<
  DebitListResponse,
  DebitListArgs
>(
  "salary/debt/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const resp = await axiosInstance.get(
        `${SALARY_DEBT_BASE}/index?${query.toString()}`
      );
      return resp.data as DebitListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch salary/debt list failed"
      );
    }
  }
);
