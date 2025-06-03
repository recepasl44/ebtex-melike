import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteScheduledAssignment } from "./thunk";
import { ScheduledAssignmentsDeleteState } from "../../../types/scheduledAssignments/delete";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

const initialState: ScheduledAssignmentsDeleteState = {
  data: null,
  status: ScheduledAssignmentsListStatus.IDLE,
  error: null,
};

const scheduledAssignmentsDeleteSlice = createSlice({
  name: "scheduledAssignmentsDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteScheduledAssignment.pending, (state) => {
        state.status = ScheduledAssignmentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteScheduledAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteScheduledAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default scheduledAssignmentsDeleteSlice.reducer;
