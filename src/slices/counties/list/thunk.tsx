import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { COUNTIES } from "../../../helpers/url_helper";
import {
  ListCountyResponse,
  CountyLListArg,
} from "../../../types/counties/list";

export const fetchCounties = createAsyncThunk<
ListCountyResponse,
CountyLListArg
>(
  "address/fetchCountiesList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${COUNTIES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListCountyResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch counties card list failed"
      );
    }
  }
)
