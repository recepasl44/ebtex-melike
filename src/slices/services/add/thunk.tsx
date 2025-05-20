import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICES } from "../../../helpers/url_helper";
import { ServicesAddPayload } from "../../../types/services/add";
import { IService } from "../../../types/services/list";

export const addService = createAsyncThunk<IService, ServicesAddPayload>(
  "services/addService",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SERVICES, payload);
      return resp.data.data as IService;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add service failed"
      );
    }
  }
);
