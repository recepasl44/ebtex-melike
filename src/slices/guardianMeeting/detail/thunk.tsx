import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIAN_MEETING } from "../../../helpers/url_helper";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

export const fetchGuardianMeeting = createAsyncThunk<
  GuardianMeetingData,
  number
>(
  "guardianMeeting/fetchGuardianMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${GUARDIAN_MEETING}/${meetingId}`);
      return resp.data.data as GuardianMeetingData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch guardian meeting failed"
      );
    }
  }
);
