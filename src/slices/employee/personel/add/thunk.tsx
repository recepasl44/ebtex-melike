import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PERSONEL } from "../../../../helpers/url_helper";
import { PersonelAddPayload } from "../../../../types/employee/personel/add";
import { Personel } from "../../../../types/employee/personel/list";

export const addPersonel = createAsyncThunk<Personel, PersonelAddPayload>(
  "personel/addPersonel",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(PERSONEL, payload);
      return response.data.data as Personel;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Add personel failed"
      );
    }
  }
);
