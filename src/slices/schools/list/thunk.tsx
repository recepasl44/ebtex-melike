import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
import { SchoolListResponse, SchoolListArg } from "../../../types/schools/list";

export const fetchSchools = createAsyncThunk<SchoolListResponse, SchoolListArg>(
  "schools/fetchSchools",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${SCHOOLS}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as SchoolListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch schools failed"
      );
    }
  }
);
