import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  PrimlerListResponse,
  PrimlerListArgs,
} from "../../../../types/employee/primler/list";
import { PRIMLER_BASE } from "../../../../helpers/url_helper";

export const fetchPrimlerList = createAsyncThunk<
  PrimlerListResponse,
  PrimlerListArgs
>(
  "primler/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(`${PRIMLER_BASE}/index?${query.toString()}`);
      return resp.data as PrimlerListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch primler list failed"
      );
    }
  }
);
