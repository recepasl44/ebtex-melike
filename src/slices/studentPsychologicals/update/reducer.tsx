import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentPsychologicalUpdateState } from "../../../types/studentPsychologicals/update";
import { updateStudentPsychological } from "./thunk";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";

const initialState: StudentPsychologicalUpdateState = {
  data: null,
  status: StudentPsychologicalsListStatus.IDLE,
  error: null,
};

const studentPsychologicalUpdateSlice = createSlice({
  name: "studentPsychologicalUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStudentPsychological.pending, (state) => {
        state.status = StudentPsychologicalsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateStudentPsychological.fulfilled,
        (state, action: PayloadAction<StudentPsychologicalData>) => {
          state.status = StudentPsychologicalsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateStudentPsychological.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentPsychologicalsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentPsychologicalUpdateSlice.reducer;
