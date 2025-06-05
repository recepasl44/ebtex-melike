import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addScheduledAssignment } from "./thunk";
import { ScheduledAssignmentsAddState } from "../../../types/scheduledAssignments/add";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

const initialState: ScheduledAssignmentsAddState = {
  data: null,
  status: ScheduledAssignmentsListStatus.IDLE,
  error: null,
};

const scheduledAssignmentAddSlice = createSlice({
  name: "scheduledAssignmentAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addScheduledAssignment.pending, (state) => {
        state.status = ScheduledAssignmentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addScheduledAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addScheduledAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ScheduledAssignmentsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default scheduledAssignmentAddSlice.reducer;
