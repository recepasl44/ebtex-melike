import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { MEETINGS } from "../../../helpers/url_helper";
import { MeetingUpdatePayload } from "../../../types/meetings/update";
import { MeetingUpdateState } from "../../../types/meetings/update";

export const updateMeeting = createAsyncThunk<
  MeetingUpdateState,
  MeetingUpdatePayload
>(
  "meetings/updateMeeting",
  async ({ meetingId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${MEETINGS}/${meetingId}`, payload);
      return resp.data.data as MeetingUpdateState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update meeting failed"
      );
    }
  }
);
