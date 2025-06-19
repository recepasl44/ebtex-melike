import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { CompensationDeleteState } from "../../../../types/employee/compensation/delete";
import { COMPENSATION_BASE } from "../../../../helpers/url_helper";

export const deleteCompensation = createAsyncThunk<
  CompensationDeleteState["data"], // number | null
  number                           // compensationId
>(
  "compensation/deleteCompensation",
  async (compensationId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${COMPENSATION_BASE}/${compensationId}`);
      // backend => { data: compensationId } or something
      return resp.data.data; // e.g. number
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete compensation failed"
      );
    }
  }
);
