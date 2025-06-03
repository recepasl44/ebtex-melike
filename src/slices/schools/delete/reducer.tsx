import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSchool } from "./thunk";
import { SchoolDeleteState } from "../../../types/schools/delete";
import { SchoolListStatus } from "../../../enums/schools/list";

const initialState: SchoolDeleteState = {
  data: null,
  status: SchoolListStatus.IDLE,
  error: null,
};

const schoolDeleteSlice = createSlice({
  name: "schoolDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSchool.pending, (state) => {
        state.status = SchoolListStatus.LOADING;
      })
      .addCase(deleteSchool.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.SUCCEEDED;
        state.data = action.payload.data;
      })
      .addCase(deleteSchool.rejected, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default schoolDeleteSlice.reducer;
