import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentPsychologicalDetailState } from "../../../types/studentPsychologicals/detail";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";
import { fetchStudentPsychological } from "./thunk";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";

const initialState: StudentPsychologicalDetailState = {
  data: null,
  status: StudentPsychologicalsListStatus.IDLE,
  error: null,
};

const studentPsychologicalDetailSlice = createSlice({
  name: "studentPsychologicalDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentPsychological.pending, (state) => {
        state.status = StudentPsychologicalsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchStudentPsychological.fulfilled,
        (state, action: PayloadAction<StudentPsychologicalData>) => {
          state.status = StudentPsychologicalsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchStudentPsychological.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentPsychologicalsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentPsychologicalDetailSlice.reducer;
