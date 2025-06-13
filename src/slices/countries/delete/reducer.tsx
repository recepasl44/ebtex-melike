import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCountry } from "./thunk";

import { CountryDeleteState } from "../../../types/countries/delete";
import { CountryListStatus } from "../../../enums/countries/list";

const initialState: CountryDeleteState = {
    data: null,
    status: CountryListStatus.IDLE,
    error: null,
};

const countryDeleteSlice = createSlice({
    name: "countryDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCountry.pending, (state) => {
                state.status = CountryListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteCountry.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteCountry.rejected, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default countryDeleteSlice.reducer;

