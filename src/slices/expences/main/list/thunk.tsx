import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES } from "../../../../helpers/url_helper";
import {
  ExpenseListResponse,
  ExpenseListArg,
} from "../../../../types/expences/main/list";

export const fetchExpenseList = createAsyncThunk<
  ExpenseListResponse,
  ExpenseListArg
>("expences/fetchExpenseList", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${EXPENCES}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as ExpenseListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch expences failed"
    );
  }
});
