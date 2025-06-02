import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
import { ISchoolUpdatePayload } from "../../../types/schools/update";
import { ISchool } from "../../../types/schools/list";

export const updateSchool = createAsyncThunk<ISchool, ISchoolUpdatePayload>(
  "school/updateSchool",
  async ({ schoolId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SCHOOLS}/${schoolId}`, payload);
      return resp.data.data as ISchool;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update school failed"
      );
    }
  }
);
