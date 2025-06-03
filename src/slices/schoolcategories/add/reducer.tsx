import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";
import { SchoolCategoriesAddState } from "../../../types/schoolcategories/add";
import { addSchoolCategory } from "./thunk";

const initialState: SchoolCategoriesAddState = {
  data: null,
  status: SchoolCategoriesListStatus.IDLE,
  error: null,
};

const schoolCategoriesAddSlice = createSlice({
  name: "schoolcategoriesAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSchoolCategory.pending, (state) => {
        state.status = SchoolCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addSchoolCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addSchoolCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default schoolCategoriesAddSlice.reducer;
