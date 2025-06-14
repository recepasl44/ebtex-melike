import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICETYPES } from "../../../helpers/url_helper";
import { ServicetypesUpdatePayload } from "../../../types/serviceTypes/update";
import { ServicetypesData } from "../../../types/serviceTypes/list";

export const updateServicetype = createAsyncThunk<
  ServicetypesData,
  ServicetypesUpdatePayload
>(
  "servicetypes/updateServicetype",
  async ({ servicetypeId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${SERVICETYPES}/${servicetypeId}`,
        payload
      );
      return resp.data.data as ServicetypesData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update servicetype failed"
      );
    }
  }
);
