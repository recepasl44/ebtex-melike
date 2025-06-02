import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentPsychologicalAddState } from "../../../types/studentPsychologicals/add";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";
import { addStudentPsychological } from "./thunk";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";

const initialState: StudentPsychologicalAddState = {
  data: null,
  status: StudentPsychologicalsListStatus.IDLE,
  error: null,
};

const studentPsychologicalAddSlice = createSlice({
  name: "studentPsychologicalAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudentPsychological.pending, (state) => {
        state.status = StudentPsychologicalsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addStudentPsychological.fulfilled,
        (state, action: PayloadAction<StudentPsychologicalData>) => {
          state.status = StudentPsychologicalsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addStudentPsychological.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentPsychologicalsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentPsychologicalAddSlice.reducer;
