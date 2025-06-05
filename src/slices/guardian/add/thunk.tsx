import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIANS } from "../../../helpers/url_helper";
import { GuardiansAddPayload } from "../../../types/guardian/add";
import { GuardianData } from "../../../types/guardian/list";

export const addGuardian = createAsyncThunk<GuardianData, GuardiansAddPayload>(
  "guardian/addGuardian",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(GUARDIANS, payload);
      return resp.data.data as GuardianData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add guardian failed"
      );
    }
  }
);
