import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
import { SchoolDeleteState } from "../../../types/schools/delete";

export const deleteSchool = createAsyncThunk<SchoolDeleteState, number>(
  "school/deleteSchool",
  async (schoolId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SCHOOLS}/${schoolId}`);
      return resp.data as SchoolDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete school failed"
      );
    }
  }
);
