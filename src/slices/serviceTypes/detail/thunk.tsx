import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICETYPES } from "../../../helpers/url_helper";
import { ServicetypesData } from "../../../types/serviceTypes/list";

export const fetchServicetype = createAsyncThunk<ServicetypesData, number>(
  "servicetypes/fetchServicetype",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SERVICETYPES}/${id}`);
      return resp.data.data as ServicetypesData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch servicetype failed"
      );
    }
  }
);
