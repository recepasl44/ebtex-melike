import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PROGRAMS } from "../../../helpers/url_helper";
import {
  ProgramUpdatePayload,
  ProgramUpdateState,
} from "../../../types/programs/update";

export const updateProgram = createAsyncThunk<
  ProgramUpdateState,
  ProgramUpdatePayload
>(
  "programs/updateProgram",
  async ({ categoryId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${PROGRAMS}/${categoryId}`,
        payload
      );
      return response.data.data as ProgramUpdateState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update program failed"
      );
    }
  }
);
