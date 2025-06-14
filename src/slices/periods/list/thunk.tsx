import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PERIODS } from "../../../helpers/url_helper";
import {
  PeriodsListArg,
  PeriodsListResponse,
} from "../../../types/periods/list";

export const fetchPeriods = createAsyncThunk<
  PeriodsListResponse,
  PeriodsListArg
>("periods/fetchPeriods", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "enabled") {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${PERIODS}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as PeriodsListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch periods failed"
    );
  }
});
