import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIANS } from "../../../helpers/url_helper";
import { GuardiansDeleteState } from "../../../types/guardian/delete";

export const deleteGuardian = createAsyncThunk<GuardiansDeleteState, number>(
  "guardians/deleteGuardian",
  async (guardianId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${GUARDIANS}/${guardianId}`);
      return resp.data as GuardiansDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete guardian failed"
      );
    }
  }
);
