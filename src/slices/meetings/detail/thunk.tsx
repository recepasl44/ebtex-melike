import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { MEETINGS } from "../../../helpers/url_helper";
import { MeetingShowState } from "../../../types/meetings/show";

export const fetchMeeting = createAsyncThunk<MeetingShowState, number>(
  "meeting/fetchMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${MEETINGS}/${meetingId}`);
      return response.data.data as MeetingShowState;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch meeting failed"
      );
    }
  }
);
