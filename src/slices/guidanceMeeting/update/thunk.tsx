import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_MEETING } from "../../../helpers/url_helper";
import { GuidanceMeetingsUpdatePayload } from "../../../types/guidanceMeeting/update";
import { GuidanceMeetList } from "../../../types/guidanceMeeting/list";

export const updateGuidanceMeeting = createAsyncThunk<
  GuidanceMeetList,
  GuidanceMeetingsUpdatePayload
>(
  "guidancemeetings/updateGuidanceMeeting",
  async ({ guidanceMeetingId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${GUIDANCE_MEETING}/${guidanceMeetingId}`,
        payload
      );
      return resp.data.data as GuidanceMeetList;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update guidance meeting failed"
      );
    }
  }
);
