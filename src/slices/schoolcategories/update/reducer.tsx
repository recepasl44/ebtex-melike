import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSchoolCategory } from "./thunk";
import { SchoolCategoriesUpdateState } from "../../../types/schoolcategories/update";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";

const initialState: SchoolCategoriesUpdateState = {
  data: null,
  status: SchoolCategoriesListStatus.IDLE,
  error: null,
};

const schoolCategoriesUpdateSlice = createSlice({
  name: "schoolcategoriesUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSchoolCategory.pending, (state) => {
        state.status = SchoolCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateSchoolCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateSchoolCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default schoolCategoriesUpdateSlice.reducer;
