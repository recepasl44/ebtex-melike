import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { EXPENCES_SUMMARY } from "../../../helpers/url_helper";
import { ExpenseSummaryResponse } from "../../../types/expences/summary/getExpenseSummary";

interface ExpenseSummaryArgs {
  start_date?: string;
  end_date?: string;
}

export const fetchExpenseSummary = createAsyncThunk<
  ExpenseSummaryResponse,
  ExpenseSummaryArgs
>(
  "expencesSummary/fetchExpenseSummary",
  async ({ start_date = "", end_date = "" }, { rejectWithValue }) => {
    try {
      const url = `${EXPENCES_SUMMARY}?start_date=${start_date}&end_date=${end_date}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ExpenseSummaryResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch expences failed"
      );
    }
  }
);
