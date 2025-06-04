// F:\xintra_react_ts\src\slices\employee\salary\debt\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import { DebitDeleteState } from "../../../../../types/employee/salary/debit/delete";
import { SALARY_DEBT_BASE } from "../../../../../helpers/url_helper";

export const deleteDebit = createAsyncThunk<
  DebitDeleteState["data"],
  number
>(
  "salary/debt/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SALARY_DEBT_BASE}/${id}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete salary/debt failed"
      );
    }
  }
);
