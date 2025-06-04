import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { FINANCIAL_SUMMARY } from "../../../helpers/url_helper";
import { FinancialSummaryData } from "../../../types/accounting/financial_summary";

export const fetchFinancialSummary = createAsyncThunk<
  FinancialSummaryData,
  void
>("financialSummary/fetch", async (_, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.get(FINANCIAL_SUMMARY);
    return resp.data as FinancialSummaryData;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Fetch financial summary failed");
  }
});
