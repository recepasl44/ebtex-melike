import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  PrimlerUpdatePayload,
  PrimlerUpdateState,
} from "../../../../types/employee/primler/update";
import { PRIMLER_BASE } from "../../../../helpers/url_helper";

export const updatePrimler = createAsyncThunk<
  PrimlerUpdateState["data"],
  PrimlerUpdatePayload
>(
  "primler/update",
  async ({ primlerId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${PRIMLER_BASE}/${primlerId}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update primler failed"
      );
    }
  }
);
