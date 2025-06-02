// F:\xintra_react_ts\src\slices\employee\primler\show\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { Primler } from "../../../../types/employee/primler/list";
import { PRIMLER_BASE } from "../../../../helpers/url_helper";

export const fetchPrimlerDetail = createAsyncThunk<
  Primler,
  number
>(
  "primler/fetchDetail",
  async (primlerId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${PRIMLER_BASE}/${primlerId}`);
      return resp.data.data[0] as Primler;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch primler detail failed"
      );
    }
  }
);
