import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SUPPLIERS } from "../../../../helpers/url_helper";
import { SupplierAddPayload } from "../../../../types/suppliers/supplier/add";
import { Supplier } from "../../../../types/suppliers/supplier/list";

export const addSupplier = createAsyncThunk<Supplier, SupplierAddPayload>(
  "supplier/addSupplier",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SUPPLIERS, payload);
      return resp.data.data as Supplier;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add supplier failed"
      );
    }
  }
);
