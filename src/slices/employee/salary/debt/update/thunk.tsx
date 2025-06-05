import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import {
  DebitUpdatePayload,
  DebitUpdateState,
} from "../../../../../types/employee/salary/debit/update";
import { SALARY_DEBT_BASE } from "../../../../../helpers/url_helper";

export const updateDebit = createAsyncThunk<
  DebitUpdateState["data"],
  DebitUpdatePayload
>(
  "salary/debt/update",
  async ({ debitId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SALARY_DEBT_BASE}/${debitId}`, payload);
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update salary/debt failed"
      );
    }
  }
);
