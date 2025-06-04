import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIAN_MEETING } from "../../../helpers/url_helper";
import {
  GuardianMeetingListResponse,
  GuardianMeetingListArg,
} from "../../../types/guardianMeeting/list";

export const fetchGuardianMeetings = createAsyncThunk<
  GuardianMeetingListResponse,
  GuardianMeetingListArg
>(
  "guardianMeeting/fetchGuardianMeetings",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${GUARDIAN_MEETING}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as GuardianMeetingListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch guardian meetings failed"
      );
    }
  }
);
