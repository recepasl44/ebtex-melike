import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { MEETINGS } from "../../../helpers/url_helper";
import { MeetingDeleteState } from "../../../types/meetings/delete";

export const deleteMeeting = createAsyncThunk<MeetingDeleteState, number>(
  "meetings/deleteMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${MEETINGS}/${meetingId}`);
      return resp.data as MeetingDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete meeting failed"
      );
    }
  }
);
