import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PERSONEL } from "../../../../helpers/url_helper";
import { PersonelShowState } from "../../../../types/employee/personel/show";

export const fetchPersonel = createAsyncThunk<PersonelShowState, number>(
  "personel/fetchPersonel",
  async (personelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${PERSONEL}/${personelId}`);
      return response.data.data as PersonelShowState;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch personel failed"
      );
    }
  }
);
