import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { COUNTRIES } from "../../../helpers/url_helper";
import { ICountry } from "../../../types/countries/list";

export const fetchCountry = createAsyncThunk<ICountry, number>(
    "country/fetchCountry",
    async (countryId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${COUNTRIES}/${countryId}`);
            return response.data.data as ICountry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch country failed"
            );
        }
    }
);
