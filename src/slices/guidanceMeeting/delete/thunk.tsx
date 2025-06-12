import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_MEETING } from "../../../helpers/url_helper";
import { GuidanceMeetingsDeleteState } from "../../../types/guidanceMeeting/delete";

export const deleteGuidanceMeeting = createAsyncThunk<
  GuidanceMeetingsDeleteState,
  number
>(
  "guidanceMeetings/deleteGuidanceMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${GUIDANCE_MEETING}/${meetingId}`
      );
      return resp.data as GuidanceMeetingsDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete guidance meeting failed"
      );
    }
  }
);
