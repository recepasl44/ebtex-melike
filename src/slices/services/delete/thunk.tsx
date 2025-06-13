import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICES } from "../../../helpers/url_helper";
import { ServicesDeleteState } from "../../../types/services/delete";

export const deleteService = createAsyncThunk<ServicesDeleteState, number>(
  "services/deleteService",
  async (service_id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SERVICES}/${service_id}`);
      return resp.data as ServicesDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete service failed"
      );
    }
  }
);
