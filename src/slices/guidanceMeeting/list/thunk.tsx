import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_MEETING } from "../../../helpers/url_helper";
import {
  GuidanceMeetingsListArg,
  ListGuidanceMeetingsResponse,
} from "../../../types/guidanceMeeting/list";

export const fetchGuidanceMeetings = createAsyncThunk<
  ListGuidanceMeetingsResponse,
  GuidanceMeetingsListArg
>(
  "guidanceMeetings/fetchGuidanceMeetings",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${GUIDANCE_MEETING}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListGuidanceMeetingsResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch guidance meetings failed"
      );
    }
  }
);
