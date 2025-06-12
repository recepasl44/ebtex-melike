import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SUPPLIERS } from "../../../../helpers/url_helper";
import { SupplierShowState } from "../../../../types/suppliers/supplier/show";

export const fetchSupplierShow = createAsyncThunk<SupplierShowState, string>(
  "supplier/fetchSupplierShow",
  async (supplierId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}`);
      return resp.data.data as SupplierShowState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch supplier failed"
      );
    }
  }
);
