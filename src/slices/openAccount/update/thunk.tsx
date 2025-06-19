import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { OPEN_ACCOUNT } from "../../../helpers/url_helper";
import { OpenAccountUpdatePayload } from "../../../types/openAccount/update";
import { IOpenAccount } from "../../../types/openAccount/list";

export const updateOpenAccount = createAsyncThunk<
  IOpenAccount,
  OpenAccountUpdatePayload
>(
  "openAccount/updateOpenAccount",
  async ({ openAccountId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${OPEN_ACCOUNT}/${openAccountId}`,
        payload
      );
      return resp.data.data as IOpenAccount;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update open account failed"
      );
    }
  }
);
