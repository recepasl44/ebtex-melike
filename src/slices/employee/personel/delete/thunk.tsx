import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PERSONEL } from "../../../../helpers/url_helper";
import { PersonelDeleteState } from "../../../../types/employee/personel/delete";

export const deletePersonel = createAsyncThunk<PersonelDeleteState, number>(
  "personel/deletePersonel",
  async (personelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${PERSONEL}/${personelId}`);
      return response.data as PersonelDeleteState;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Delete personel failed"
      );
    }
  }
);
