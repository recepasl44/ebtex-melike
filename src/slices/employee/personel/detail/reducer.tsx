import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPersonel } from "./thunk";
import { PersonelShowState } from "../../../../types/employee/personel/show";
import { PersonelListStatus } from "../../../../enums/employee/personel/list";

const initialState: PersonelShowState = {
  data: null,
  status: PersonelListStatus.IDLE,
  error: null,
};

const personelShowSlice = createSlice({
  name: "personelShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonel.pending, (state) => {
        state.status = PersonelListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPersonel.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchPersonel.rejected, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default personelShowSlice.reducer;
