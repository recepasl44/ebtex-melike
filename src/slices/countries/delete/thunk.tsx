import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { COUNTRIES } from "../../../helpers/url_helper";
import { ICountry } from "../../../types/countries/list";

export const deleteCountry = createAsyncThunk<ICountry, number>(
    "countries/deleteCountry",
    async (countryId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${COUNTRIES}/${countryId}`);
            return resp.data.data as ICountry;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete country failed"
            );
        }
    }
);
