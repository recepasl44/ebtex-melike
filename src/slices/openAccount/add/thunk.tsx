import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { OPEN_ACCOUNT } from "../../../helpers/url_helper";
import { OpenAccountAddPayload } from "../../../types/openAccount/add";
import { IOpenAccount } from "../../../types/openAccount/list";

export const addOpenAccount = createAsyncThunk<
  IOpenAccount,
  OpenAccountAddPayload
>("openAccount/addOpenAccount", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.post(OPEN_ACCOUNT, payload);
    return resp.data.data as IOpenAccount;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Add open account failed"
    );
  }
});
