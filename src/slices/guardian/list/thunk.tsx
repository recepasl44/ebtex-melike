import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIANS } from "../../../helpers/url_helper";
import {
  GuardianListResponse,
  GuardianListArg,
} from "../../../types/guardian/list";

export const fetchGuardians = createAsyncThunk<
  GuardianListResponse,
  GuardianListArg
>("guardians/fetchGuardians", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "enabled") {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${GUARDIANS}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as GuardianListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch guardians failed"
    );
  }
});
