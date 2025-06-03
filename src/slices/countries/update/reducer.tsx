import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updateCountry } from "./thunk";
import { ICountry } from "../../../types/countries/list";
import { CountryListStatus } from "../../../enums/countries/list";

interface CountryUpdateState {
    data: ICountry | null;
    status: CountryListStatus;
    error: string | null;
}

const initialState: CountryUpdateState = {
    data: null,
    status: CountryListStatus.IDLE,
    error: null,
};

const countryUpdateSlice = createSlice({
    name: "countryUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCountry.pending, (state) => {
                state.status = CountryListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateCountry.fulfilled, (state, action: PayloadAction<ICountry>) => {
                state.status = CountryListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateCountry.rejected, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default countryUpdateSlice.reducer;
