
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCountriesList } from "./thunk";
import {
  CountryListResponse,
  CountryListState,
} from "../../../types/countries/list";
import { CountryListStatus } from "../../../enums/countries/list";

const initialState: CountryListState = {
  data: [],           // başlangıçta boş liste
  meta: null,         // henüz meta yok
  status: CountryListStatus.IDLE,
  error: null,
};

const countryListSlice = createSlice({
  name: "countries/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesList.pending, (state) => {
        state.status = CountryListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCountriesList.fulfilled,
        (state, action: PayloadAction<CountryListResponse>) => {
          state.status = CountryListStatus.SUCCEEDED;
          // action.payload.data ve action.payload.meta’yı aktar
          state.data = action.payload.data;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchCountriesList.rejected,
        (state, action) => {
          state.status = CountryListStatus.FAILED;
          state.error = (action.payload as string | undefined) ?? "Country fetch failed";
        }
      );
  },
});

export default countryListSlice.reducer;
