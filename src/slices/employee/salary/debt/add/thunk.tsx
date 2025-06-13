import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import { DebitAddPayload, DebitAddState } from "../../../../../types/employee/salary/debit/add";
import { SALARY_DEBT_BASE } from "../../../../../helpers/url_helper";

export const addDebit = createAsyncThunk<
  DebitAddState["data"],
  DebitAddPayload
>(
  "salary/debt/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SALARY_DEBT_BASE}`, payload);
      return resp.data.data; // Tekil Debit
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add salary/debt failed"
      );
    }
  }
);
