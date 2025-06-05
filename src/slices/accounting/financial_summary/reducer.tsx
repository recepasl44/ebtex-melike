import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FinancialSummaryState,
  FinancialSummaryData,
} from "../../../types/accounting/financial_summary";
import FinancialSummaryStatus from "../../../enums/accounting/financial_summary/status";
import { fetchFinancialSummary } from "./thunk";

const initialState: FinancialSummaryState = {
  data: null,
  status: FinancialSummaryStatus.IDLE,
  error: null,
};

const financialSummarySlice = createSlice({
  name: "financialSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialSummary.pending, (state) => {
        state.status = FinancialSummaryStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchFinancialSummary.fulfilled,
        (state, action: PayloadAction<FinancialSummaryData>) => {
          state.status = FinancialSummaryStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchFinancialSummary.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = FinancialSummaryStatus.FAILED;
          state.error = action.payload || "Fetch financial summary failed";
        }
      );
  },
});

export default financialSummarySlice.reducer;
