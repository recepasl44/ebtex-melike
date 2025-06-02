import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchScheduledAssignment } from "./thunk";
import { ScheduledAssignmentsDetailState } from "../../../types/scheduledAssignments/detail";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

const initialState: ScheduledAssignmentsDetailState = {
  data: null,
  status: ScheduledAssignmentsListStatus.IDLE,
  error: null,
};

const scheduledAssignmentShowSlice = createSlice({
  name: "scheduledAssignmentShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduledAssignment.pending, (state) => {
        state.status = ScheduledAssignmentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchScheduledAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchScheduledAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default scheduledAssignmentShowSlice.reducer;
