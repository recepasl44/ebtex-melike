import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICETYPES } from "../../../helpers/url_helper";
import {
  ServicetypesListArg,
  ServicetypesListResponse,
} from "../../../types/serviceTypes/list";

export const fetchServicetypes = createAsyncThunk<
  ServicetypesListResponse,
  ServicetypesListArg
>(
  "servicetypes/fetchServicetypes",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${SERVICETYPES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ServicetypesListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch servicetypes failed"
      );
    }
  }
);
