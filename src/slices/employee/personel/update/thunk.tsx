import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PersonelUpdatePayload } from "../../../../types/employee/personel/update";
import { Personel } from "../../../../types/employee/personel/list";

export const updatePersonel = createAsyncThunk<Personel, PersonelUpdatePayload>(
  "personel/updatePersonel",
  async ({ personelId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `/personel/${personelId}`,
        payload
      );
      return resp.data.data as Personel;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update personel failed"
      );
    }
  }
);
