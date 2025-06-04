import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_OBSERVATIONS } from "../../../helpers/url_helper";
import { GuidanceObservationsAddPayload } from "../../../types/guidanceObservations/add";
import { GuidanceObservation } from "../../../types/guidanceObservations/list";

export const addGuidanceObservation = createAsyncThunk<
  GuidanceObservation,
  GuidanceObservationsAddPayload
>(
  "guidanceobservations/addGuidanceObservation",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(GUIDANCE_OBSERVATIONS, payload);
      return resp.data.data as GuidanceObservation;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add guidance observation failed"
      );
    }
  }
);
