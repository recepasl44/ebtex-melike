import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { BUDGET_ESTIMATE } from "../../../../helpers/url_helper";
import { BudgetEstimateResponse, BudgetEstimateArgs } from "../../../../types/accounting/budget_estimate/list";

export const fetchBudgetEstimate = createAsyncThunk<
  BudgetEstimateResponse,
  BudgetEstimateArgs
>("budgetEstimate/fetch", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "enabled") {
        query.append(key, String(value));
      }
    });
    const resp = await axiosInstance.get(
      `${BUDGET_ESTIMATE}?${query.toString()}`
    );
    return resp.data as BudgetEstimateResponse;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Fetch budget estimate failed");
  }
});
