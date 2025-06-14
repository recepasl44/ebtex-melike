import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_OBSERVATIONS } from "../../../helpers/url_helper";
import {
  GuidanceObservationsListArg,
  GuidanceObservationsListResponse,
} from "../../../types/guidanceObservations/list";

export const fetchGuidanceObservations = createAsyncThunk<
  GuidanceObservationsListResponse,
  GuidanceObservationsListArg
>(
  "guidanceobservations/fetchGuidanceObservations",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const url = `${GUIDANCE_OBSERVATIONS}?${query.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as GuidanceObservationsListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch guidance observations failed"
      );
    }
  }
);
