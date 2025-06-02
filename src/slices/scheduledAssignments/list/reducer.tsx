import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchScheduledAssignments } from "./thunk";
import { ScheduledAssignmentsListResponse } from "../../../types/scheduledAssignments/list";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

export interface ScheduledAssignmentsListState {
  data: ScheduledAssignmentsListResponse["data"] | null;
  links: ScheduledAssignmentsListResponse["links"] | null;
  meta: ScheduledAssignmentsListResponse["meta"] | null;
  status: ScheduledAssignmentsListStatus;
  error: string | null;
}

const initialState: ScheduledAssignmentsListState = {
  data: null,
  links: null,
  meta: null,
  status: ScheduledAssignmentsListStatus.IDLE,
  error: null,
};

const scheduledAssignmentsListSlice = createSlice({
  name: "scheduledAssignments/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScheduledAssignments.pending, (state) => {
      state.status = ScheduledAssignmentsListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchScheduledAssignments.fulfilled,
      (state, action: PayloadAction<ScheduledAssignmentsListResponse>) => {
        state.status = ScheduledAssignmentsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchScheduledAssignments.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = ScheduledAssignmentsListStatus.FAILED;
        state.error = action.payload || "Fetch scheduled assignments failed";
      }
    );
  },
});

export default scheduledAssignmentsListSlice.reducer;
