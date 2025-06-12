import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSchool } from "./thunk";
import { SchoolShowState } from "../../../types/schools/show";
import { SchoolListStatus } from "../../../enums/schools/list";

const initialState: SchoolShowState = {
  data: null,
  status: SchoolListStatus.IDLE,
  error: null,
};

const schoolShowSlice = createSlice({
  name: "schoolShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchool.pending, (state) => {
        state.status = SchoolListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSchool.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchSchool.rejected, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default schoolShowSlice.reducer;
