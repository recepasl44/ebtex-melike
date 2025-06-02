// F:\xintra_react_ts\src\slices\employee\salary\debt\show\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import { Debit } from "../../../../../types/employee/salary/debit/list";
import { SALARY_DEBT_BASE } from "../../../../../helpers/url_helper";

export const fetchDebitDetail = createAsyncThunk<
  Debit,
  number
>(
  "salary/debt/fetchDetail",
  async (personelId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SALARY_DEBT_BASE}/index/?personel_id=${personelId}`);
      return resp.data.data as Debit;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch salary/debt detail failed"
      );
    }
  }
);
