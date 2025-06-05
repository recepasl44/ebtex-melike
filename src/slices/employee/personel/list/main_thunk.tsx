import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  PersonelListState,
  PersonelListArgs,
} from "../../../../types/employee/personel/list";

export const fetchPersonel = createAsyncThunk<
  PersonelListState,
  PersonelListArgs
>("personel/fetchPersonel", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    const response = await axiosInstance.get(
      `/personel?${query.toString()}`
    );
    return response.data.personeller.data as PersonelListState;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch personel failed"
    );
  }
});
