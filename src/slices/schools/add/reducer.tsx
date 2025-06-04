import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSchool } from "./thunk";
import { SchoolAddState } from "../../../types/schools/add";
import { SchoolListStatus } from "../../../enums/schools/list";

const initialState: SchoolAddState = {
  data: null,
  status: SchoolListStatus.IDLE,
  error: null,
};

const schoolAddSlice = createSlice({
  name: "schoolAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSchool.pending, (state) => {
        state.status = SchoolListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSchool.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSchool.rejected, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default schoolAddSlice.reducer;
