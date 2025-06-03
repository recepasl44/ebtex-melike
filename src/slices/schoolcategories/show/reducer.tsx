import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchoolCategoryShowState } from "../../../types/schoolcategories/show";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";
import { fetchSchoolCategory } from "./thunk";
import { SchoolCategoryData } from "../../../types/schoolcategories/list";

const initialState: SchoolCategoryShowState = {
  data: null,
  status: SchoolCategoriesListStatus.IDLE,
  error: null,
};

const schoolCategoryShowSlice = createSlice({
  name: "schoolCategoryShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolCategory.pending, (state) => {
        state.status = SchoolCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSchoolCategory.fulfilled,
        (state, action: PayloadAction<SchoolCategoryData>) => {
          state.status = SchoolCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchSchoolCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default schoolCategoryShowSlice.reducer;
