import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICES } from "../../../helpers/url_helper";
import { IService } from "../../../types/services/list";

export const fetchService = createAsyncThunk<IService, number>(
  "services/fetchService",
  async (service_id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SERVICES}/${service_id}`);
      return resp.data.data as IService;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch service failed"
      );
    }
  }
);
