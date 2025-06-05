import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_MEETING } from "../../../helpers/url_helper";
import { GuidanceMeetingsAddPayload } from "../../../types/guidanceMeeting/add";
import { GuidanceMeetList } from "../../../types/guidanceMeeting/list";

export const addGuidanceMeeting = createAsyncThunk<
  GuidanceMeetList,
  GuidanceMeetingsAddPayload
>(
  "guidanceMeetings/addGuidanceMeeting",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(GUIDANCE_MEETING, payload);
      return resp.data.data as GuidanceMeetList;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add guidance meeting failed"
      );
    }
  }
);
