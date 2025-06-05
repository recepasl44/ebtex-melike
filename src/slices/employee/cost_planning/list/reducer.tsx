import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CostPlanningListState, CostPlanningListResponse } from "../../../../types/employee/cost_planning/list";
import { fetchCostPlanningList } from "./thunk";
import CostPlanningListStatus from "../../../../enums/employee/cost_planning/list";

const initialState: CostPlanningListState = {
  data: null,
  status: CostPlanningListStatus.IDLE,
  error: null,
};

const costPlanningListSlice = createSlice({
  name: "costPlanning/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostPlanningList.pending, (state) => {
        state.status = CostPlanningListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCostPlanningList.fulfilled,
        (state, action: PayloadAction<CostPlanningListResponse>) => {
          state.status = CostPlanningListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchCostPlanningList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CostPlanningListStatus.FAILED;
          state.error = action.payload || "Fetch cost planning failed";
        }
      );
  },
});

export default costPlanningListSlice.reducer;
