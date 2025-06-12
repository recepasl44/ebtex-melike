import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchoolCategoriesDeleteState } from "../../../types/schoolcategories/delete";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";
import { deleteSchoolCategory } from "./thunk";

const initialState: SchoolCategoriesDeleteState = {
  data: null,
  status: SchoolCategoriesListStatus.IDLE,
  error: null,
};

const schoolCategoriesDeleteSlice = createSlice({
  name: "schoolcategoriesDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSchoolCategory.pending, (state) => {
        state.status = SchoolCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteSchoolCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        deleteSchoolCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default schoolCategoriesDeleteSlice.reducer;
