import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_OBSERVATIONS } from "../../../helpers/url_helper";
import { GuidanceObservationsDetailState } from "../../../types/guidanceObservations/detail";

export const fetchGuidanceObservation = createAsyncThunk<
  GuidanceObservationsDetailState["data"],
  number
>(
  "guidanceobservations/fetchGuidanceObservation",
  async (guidanceObservationId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(
        `${GUIDANCE_OBSERVATIONS}/${guidanceObservationId}`
      );
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch guidance observation failed"
      );
    }
  }
);
