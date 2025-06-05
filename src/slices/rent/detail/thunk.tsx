import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { RENTS } from "../../../helpers/url_helper";
import { IRent } from "../../../types/rent/detail";

export const fetchRent = createAsyncThunk<IRent, number>(
  "rent/fetchRent",
  async (rentId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${RENTS}/${rentId}`);
      return resp.data.data as IRent;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch rent failed");
    }
  }
);
