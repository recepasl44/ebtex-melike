import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateStudentinfo } from "./thunk";
import { StudentinfosUpdateState } from "../../../types/studentInfos/update";
import StudentinfosListStatus from "../../../enums/studentInfos/list";

const initialState: StudentinfosUpdateState = {
  data: null,
  status: StudentinfosListStatus.IDLE,
  error: null,
};

const studentinfosUpdateSlice = createSlice({
  name: "studentinfosUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStudentinfo.pending, (state) => {
        state.status = StudentinfosListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateStudentinfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateStudentinfo.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentinfosUpdateSlice.reducer;
