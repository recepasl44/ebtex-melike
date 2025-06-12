
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PROGRAMS } from "../../../helpers/url_helper";
import { ProgramDetailState } from "../../../types/programs/detail";

export const fetchProgramDetail = createAsyncThunk<ProgramDetailState, number>(
  "programs/fetchProgramDetail",
  async (programId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${PROGRAMS}/${programId}`);
      return response.data.data as ProgramDetailState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch program detail failed");
    }
  }
);
