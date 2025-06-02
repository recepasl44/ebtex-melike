import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCountry } from "./thunk";
import { CountryAddState } from "../../../types/countries/add";
import { CountryListStatus } from "../../../enums/countries/list";


const initialState: CountryAddState = {
    data: null,
    status: CountryListStatus.IDLE,
    error: null,
};

const countryAddSlice = createSlice({
    name: "countryAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCountry.pending, (state) => {
                state.status = CountryListStatus.LOADING;
                state.error = null;
            })
            .addCase(addCountry.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addCountry.rejected, (state, action: PayloadAction<any>) => {
                state.status = CountryListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default countryAddSlice.reducer;
