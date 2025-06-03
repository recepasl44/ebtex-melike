import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIAN_MEETING } from "../../../helpers/url_helper";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

export const deleteGuardianMeeting = createAsyncThunk<
  GuardianMeetingData,
  number
>(
  "guardianMeeting/deleteGuardianMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${GUARDIAN_MEETING}/${meetingId}`
      );
      return resp.data.data as GuardianMeetingData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete guardian meeting failed"
      );
    }
  }
);
