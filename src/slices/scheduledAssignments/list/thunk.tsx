import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHEDULED_ASSIGNMENTS } from "../../../helpers/url_helper";
import {
  ScheduledAssignmentsListResponse,
  ScheduledAssignmentsListArg,
} from "../../../types/scheduledAssignments/list";

export const fetchScheduledAssignments = createAsyncThunk<
  ScheduledAssignmentsListResponse,
  ScheduledAssignmentsListArg
>(
  "scheduledAssignments/fetchScheduledAssignments",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${SCHEDULED_ASSIGNMENTS}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ScheduledAssignmentsListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch scheduled assignments failed"
      );
    }
  }
);
