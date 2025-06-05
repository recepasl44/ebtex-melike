import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateScheduledAssignment } from "./thunk";
import { ScheduledAssignmentsUpdateState } from "../../../types/scheduledAssignments/update";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

const initialState: ScheduledAssignmentsUpdateState = {
  data: null,
  status: ScheduledAssignmentsListStatus.IDLE,
  error: null,
};

const scheduledAssignmentsUpdateSlice = createSlice({
  name: "scheduledAssignmentsUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateScheduledAssignment.pending, (state) => {
        state.status = ScheduledAssignmentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateScheduledAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateScheduledAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default scheduledAssignmentsUpdateSlice.reducer;
