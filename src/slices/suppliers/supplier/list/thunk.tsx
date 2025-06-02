import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SUPPLIERS } from "../../../../helpers/url_helper";
import { SuppliersListResponse ,SuppliersListArg } from "../../../../types/suppliers/supplier/list";


export const fetchSupplierList = createAsyncThunk<SuppliersListResponse, SuppliersListArg>(
  'supplier/supplierList',
  async (queryParams, { rejectWithValue }) => {
      try {
          const query = new URLSearchParams();
          Object.entries(queryParams).forEach(([key, value]) => {
              if (value !== undefined && value !== null) {
                  query.append(key, String(value));
              }
          });
          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${SUPPLIERS}?${queryString}`;
          const resp = await axiosInstance.get(url);
          return resp.data as SuppliersListResponse;
      } catch (err: any) {
          return rejectWithValue(err.response?.data?.message || 'Fetch units failed');
      }
  }
);

