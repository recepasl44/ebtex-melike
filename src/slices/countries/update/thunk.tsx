import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { COUNTRIES } from "../../../helpers/url_helper";
import { ICountry } from "../../../types/countries/list";

export interface ICountryUpdatePayload {
    countryId: number;
    payload: {
        name: string;
        code?: string;

    };
}

export const updateCountry = createAsyncThunk<ICountry, ICountryUpdatePayload>(
    "country/updateCountry",
    async ({ countryId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${COUNTRIES}/${countryId}`, payload);
            return resp.data.data as ICountry;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update country failed"
            );
        }
    }
);
