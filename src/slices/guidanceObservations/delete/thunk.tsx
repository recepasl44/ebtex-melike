import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUIDANCE_OBSERVATIONS } from "../../../helpers/url_helper";
import { GuidanceObservationsDeleteState } from "../../../types/guidanceObservations/delete";

export const deleteGuidanceObservation = createAsyncThunk<
  GuidanceObservationsDeleteState["data"],
  number
>(
  "guidanceobservations/deleteGuidanceObservation",
  async (guidanceObservationId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${GUIDANCE_OBSERVATIONS}/${guidanceObservationId}`
      );
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete guidance observation failed"
      );
    }
  }
);
