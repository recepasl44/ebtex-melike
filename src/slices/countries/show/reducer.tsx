import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCountry } from "./thunk";

import { ICountry } from "../../../types/countries/list";
import { CountryListStatus } from "../../../enums/countries/list";

interface CountryShowState {
    data: ICountry | null;
    status: CountryListStatus;
    error: string | null;
}

const initialState: CountryShowState = {
    data: null,
    status: CountryListStatus.IDLE,
    error: null,
};

const countryShowSlice = createSlice({
    name: "countryShow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountry.pending, (state) => {
                state.status = CountryListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchCountry.fulfilled, (state, action: PayloadAction<ICountry>) => {
                state.status = CountryListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchCountry.rejected, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default countryShowSlice.reducer;

