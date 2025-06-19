import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIAN_MEETING } from "../../../helpers/url_helper";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";
import { GuardianMeetingAddPayload } from "../../../types/guardianMeeting/add";

export const addGuardianMeeting = createAsyncThunk<
  GuardianMeetingData,
  GuardianMeetingAddPayload
>(
  "guardianMeeting/addGuardianMeeting",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(GUARDIAN_MEETING, payload);
      return resp.data.data as GuardianMeetingData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add guardian meeting failed"
      );
    }
  }
);
