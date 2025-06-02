import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICES } from "../../../helpers/url_helper";
import { ServicesUpdatePayload } from "../../../types/services/update";
import { IService } from "../../../types/services/list";

export const updateService = createAsyncThunk<IService, ServicesUpdatePayload>(
  "services/updateService",
  async ({ service_id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${SERVICES}/${service_id}`,
        payload
      );
      return resp.data.data as IService;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update service failed"
      );
    }
  }
);
