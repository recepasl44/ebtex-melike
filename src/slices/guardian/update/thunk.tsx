import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { GUARDIANS } from "../../../helpers/url_helper";
import { GuardiansUpdatePayload } from "../../../types/guardian/update";
import { GuardianData } from "../../../types/guardian/list";

export const updateGuardian = createAsyncThunk<
  GuardianData,
  GuardiansUpdatePayload
>(
  "guardians/updateGuardian",
  async ({ guardianId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${GUARDIANS}/${guardianId}`,
        payload
      );
      return resp.data.data as GuardianData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update guardian failed"
      );
    }
  }
);
