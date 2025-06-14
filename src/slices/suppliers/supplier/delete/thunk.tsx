import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SUPPLIERS } from "../../../../helpers/url_helper";

export const deleteSupplier = createAsyncThunk<number, number>(
  "supplier/deleteSupplier",
  async (supplierId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${SUPPLIERS}/${supplierId}`);
      return supplierId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete supplier failed"
      );
    }
  }
);
