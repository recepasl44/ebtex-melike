import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICES } from "../../../helpers/url_helper";
import {
  ServiceListArg,
  ServiceListResponse,
} from "../../../types/services/list";

export const fetchServices = createAsyncThunk<
  ServiceListResponse,
  ServiceListArg
>("services/fetchServices", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "enabled") {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${SERVICES}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as ServiceListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch services failed"
    );
  }
});
