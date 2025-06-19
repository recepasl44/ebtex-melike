import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BudgetEstimateState,
  BudgetEstimateResponse,
} from "../../../../types/accounting/budget_estimate/list";
import BudgetEstimateStatus from "../../../../enums/accounting/budget_estimate/list";
import { fetchBudgetEstimate } from "./thunk";

const initialState: BudgetEstimateState = {
  data: null,
  summary: null,
  status: BudgetEstimateStatus.IDLE,
  error: null,
};

const budgetEstimateSlice = createSlice({
  name: "budgetEstimate/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetEstimate.pending, (state) => {
        state.status = BudgetEstimateStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchBudgetEstimate.fulfilled,
        (state, action: PayloadAction<BudgetEstimateResponse>) => {
          state.status = BudgetEstimateStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.summary = action.payload.summary;
        }
      )
      .addCase(fetchBudgetEstimate.rejected, (state, action: PayloadAction<any>) => {
        state.status = BudgetEstimateStatus.FAILED;
        state.error = action.payload || "Fetch budget estimate failed";
      });
  },
});

export default budgetEstimateSlice.reducer;
