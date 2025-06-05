import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHEDULED_ASSIGNMENTS } from "../../../helpers/url_helper";
import { ScheduledAssignmentsDeleteState } from "../../../types/scheduledAssignments/delete";

export const deleteScheduledAssignment = createAsyncThunk<
  ScheduledAssignmentsDeleteState,
  number
>(
  "scheduledAssignments/deleteScheduledAssignment",
  async (scheduledAssignmentId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${SCHEDULED_ASSIGNMENTS}/${scheduledAssignmentId}`
      );
      return resp.data as ScheduledAssignmentsDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete scheduled assignment failed"
      );
    }
  }
);
