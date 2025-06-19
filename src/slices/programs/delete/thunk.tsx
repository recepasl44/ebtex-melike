import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PROGRAMS } from "../../../helpers/url_helper";
import { ProgramDeleteState } from "../../../types/programs/delete";

export const deleteProgram = createAsyncThunk<ProgramDeleteState, number>(
  "programs/deleteProgram",
  async (programId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${PROGRAMS}/${programId}`);
      return response.data as ProgramDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete program failed");
    }
  }
);
