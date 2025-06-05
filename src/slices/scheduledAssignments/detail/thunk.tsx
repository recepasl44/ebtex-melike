import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHEDULED_ASSIGNMENTS } from "../../../helpers/url_helper";
import { ScheduledAssignmentsDetailState } from "../../../types/scheduledAssignments/detail";

export const fetchScheduledAssignment = createAsyncThunk<
  ScheduledAssignmentsDetailState,
  number
>(
  "scheduledAssignment/fetchScheduledAssignment",
  async (scheduledAssignmentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${SCHEDULED_ASSIGNMENTS}/${scheduledAssignmentId}`
      );
      return response.data.data as ScheduledAssignmentsDetailState;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch scheduled assignment failed"
      );
    }
  }
);
