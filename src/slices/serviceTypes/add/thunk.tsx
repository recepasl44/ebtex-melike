import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICETYPES } from "../../../helpers/url_helper";
import { ServicetypesAddPayload } from "../../../types/serviceTypes/add";
import { ServicetypesData } from "../../../types/serviceTypes/list";

export const addServicetype = createAsyncThunk<
  ServicetypesData,
  ServicetypesAddPayload
>("servicetypes/addServicetype", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.post(SERVICETYPES, payload);
    return resp.data.data as ServicetypesData;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Add servicetype failed"
    );
  }
});
