// F:\xintra_react_ts\src\slices\employee\primler\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PrimlerDeleteState } from "../../../../types/employee/primler/delete";
import { PRIMLER_BASE } from "../../../../helpers/url_helper";

export const deletePrimler = createAsyncThunk<
  PrimlerDeleteState["data"],
  number
>(
  "primler/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${PRIMLER_BASE}/${id}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete primler failed"
      );
    }
  }
);
