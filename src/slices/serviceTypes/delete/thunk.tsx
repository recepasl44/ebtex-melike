import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SERVICETYPES } from "../../../helpers/url_helper";
import { ServicetypesDeleteState } from "../../../types/serviceTypes/delete";

export const deleteServicetype = createAsyncThunk<
  ServicetypesDeleteState,
  number
>("servicetypes/deleteServicetype", async (id, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.delete(`${SERVICETYPES}/${id}`);
    return resp.data as ServicetypesDeleteState;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Delete servicetype failed"
    );
  }
});
