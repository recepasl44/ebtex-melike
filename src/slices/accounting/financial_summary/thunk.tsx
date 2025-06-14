import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { FINANCIAL_SUMMARY } from "../../../helpers/url_helper";
import { FinancialSummaryData } from "../../../types/accounting/financial_summary";

interface FinancialSummaryArgs {
  season_id?: number;
  date?: string;
}

export const fetchFinancialSummary = createAsyncThunk<
  FinancialSummaryData,
  FinancialSummaryArgs | undefined
>("financialSummary/fetch", async (args, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();
    if (args?.season_id) params.append("season_id", String(args.season_id));
    if (args?.date) params.append("date", args.date);
    const queryString = params.toString();
    const url = queryString ? `${FINANCIAL_SUMMARY}?${queryString}` : FINANCIAL_SUMMARY;
    const resp = await axiosInstance.get(url);
    return resp.data as FinancialSummaryData;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch financial summary failed"
    );
  }
});
