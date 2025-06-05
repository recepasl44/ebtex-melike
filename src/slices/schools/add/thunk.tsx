import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
import { ISchoolAddPayload } from "../../../types/schools/add";
import { ISchool } from "../../../types/schools/list";

export const addSchool = createAsyncThunk<ISchool, ISchoolAddPayload>(
  "school/addSchool",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SCHOOLS, payload);
      return resp.data.data as ISchool;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add school failed"
      );
    }
  }
);
