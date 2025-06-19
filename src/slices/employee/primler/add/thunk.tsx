import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  PrimlerAddPayload,
  PrimlerAddState,
} from "../../../../types/employee/primler/add";
import { PRIMLER_BASE } from "../../../../helpers/url_helper";

export const addPrimler = createAsyncThunk<
  PrimlerAddState["data"],
  PrimlerAddPayload
>(
  "primler/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${PRIMLER_BASE}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add primler failed"
      );
    }
  }
);
