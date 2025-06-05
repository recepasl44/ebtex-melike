import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_OBSERVATIONS } from "../../../helpers/url_helper";
import { GuidanceObservationsUpdatePayload } from "../../../types/guidanceObservations/update";
import { GuidanceObservation } from "../../../types/guidanceObservations/list";

export const updateGuidanceObservation = createAsyncThunk<
  GuidanceObservation,
  GuidanceObservationsUpdatePayload
>(
  "guidanceobservations/updateGuidanceObservation",
  async ({ guidanceObservationId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${GUIDANCE_OBSERVATIONS}/${guidanceObservationId}`,
        payload
      );
      return resp.data.data as GuidanceObservation;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update guidance observation failed"
      );
    }
  }
);
