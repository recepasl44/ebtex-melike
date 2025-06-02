import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHEDULED_ASSIGNMENTS } from "../../../helpers/url_helper";
import { ScheduledAssignmentsUpdatePayload } from "../../../types/scheduledAssignments/update";
import { ScheduledAssignmentData } from "../../../types/scheduledAssignments/list";

export const updateScheduledAssignment = createAsyncThunk<
  ScheduledAssignmentData,
  ScheduledAssignmentsUpdatePayload
>(
  "scheduledAssignments/updateScheduledAssignment",
  async ({ scheduledAssignmentId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${SCHEDULED_ASSIGNMENTS}/${scheduledAssignmentId}`,
        payload
      );
      return resp.data.data as ScheduledAssignmentData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update scheduled assignment failed"
      );
    }
  }
);
