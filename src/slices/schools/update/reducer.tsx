import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSchool } from "./thunk";
import { SchoolShowState } from "../../../types/schools/update";
import { SchoolListStatus } from "../../../enums/schools/list";

const initialState: SchoolShowState = {
  data: null,
  status: SchoolListStatus.IDLE,
  error: null,
};

const schoolUpdateSlice = createSlice({
  name: "schoolUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSchool.pending, (state) => {
        state.status = SchoolListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSchool.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateSchool.rejected, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default schoolUpdateSlice.reducer;
