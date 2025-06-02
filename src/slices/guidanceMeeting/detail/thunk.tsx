import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_MEETING } from "../../../helpers/url_helper";
import { GuidanceMeetList } from "../../../types/guidanceMeeting/list";

export const fetchGuidanceMeeting = createAsyncThunk<GuidanceMeetList, number>(
  "guidanceMeetings/fetchGuidanceMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${GUIDANCE_MEETING}/${meetingId}`);
      return resp.data.data as GuidanceMeetList;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch guidance meeting failed"
      );
    }
  }
);
