import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentPsychologicalDeleteState } from "../../../types/studentPsychologicals/delete";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";
import { deleteStudentPsychological } from "./thunk";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";

const initialState: StudentPsychologicalDeleteState = {
  data: null,
  status: StudentPsychologicalsListStatus.IDLE,
  error: null,
};

const studentPsychologicalDeleteSlice = createSlice({
  name: "studentPsychologicalDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudentPsychological.pending, (state) => {
        state.status = StudentPsychologicalsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteStudentPsychological.fulfilled,
        (state, action: PayloadAction<StudentPsychologicalData>) => {
          state.status = StudentPsychologicalsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteStudentPsychological.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentPsychologicalsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentPsychologicalDeleteSlice.reducer;
