import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIANS } from "../../../helpers/url_helper";
import { GuardianData } from "../../../types/guardian/list";

export const fetchGuardian = createAsyncThunk<GuardianData, number>(
  "guardian/fetchGuardian",
  async (guardianId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${GUARDIANS}/${guardianId}`);
      return response.data.data as GuardianData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch guardian failed"
      );
    }
  }
);
