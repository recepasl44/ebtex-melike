import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIAN_MEETING } from "../../../helpers/url_helper";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";
import { GuardianMeetingUpdatePayload } from "../../../types/guardianMeeting/update";

export const updateGuardianMeeting = createAsyncThunk<
  GuardianMeetingData,
  GuardianMeetingUpdatePayload
>(
  "guardianMeeting/updateGuardianMeeting",
  async ({ guardianMeetingId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${GUARDIAN_MEETING}/${guardianMeetingId}`,
        payload
      );
      return resp.data.data as GuardianMeetingData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update guardian meeting failed"
      );
    }
  }
);
