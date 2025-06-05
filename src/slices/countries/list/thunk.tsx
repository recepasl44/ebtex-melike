import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { COUNTRIES } from "../../../helpers/url_helper";
import {
  CountryListResponse,
  CountryListArg,
} from "../../../types/countries/list";

export const fetchCountriesList = createAsyncThunk<
CountryListResponse,
CountryListArg
>(
  "address/fetchCountriesList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${COUNTRIES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as CountryListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch country card list failed"
      );
    }
  }
)
