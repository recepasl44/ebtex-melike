import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { MEETINGS } from "../../../helpers/url_helper";
import { MeetingAddPayload } from "../../../types/meetings/add";
import { Meeting } from "../../../types/meetings/list";

export const addMeeting = createAsyncThunk<Meeting, MeetingAddPayload>(
  "meetings/addMeeting",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(MEETINGS, payload);
      return resp.data.data as Meeting;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add meeting failed"
      );
    }
  }
);
