import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHEDULED_ASSIGNMENTS } from "../../../helpers/url_helper";
import { ScheduledAssignmentsAddPayload } from "../../../types/scheduledAssignments/add";
import { ScheduledAssignmentData } from "../../../types/scheduledAssignments/list";

export const addScheduledAssignment = createAsyncThunk<
  ScheduledAssignmentData,
  ScheduledAssignmentsAddPayload
>(
  "scheduledAssignment/addScheduledAssignment",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SCHEDULED_ASSIGNMENTS, payload);
      return resp.data.data as ScheduledAssignmentData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add scheduled assignment failed"
      );
    }
  }
);
