import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteStudentinfo } from "./thunk";
import { StudentinfosDeleteState } from "../../../types/studentInfos/delete";
import StudentinfosListStatus from "../../../enums/studentInfos/list";

const initialState: StudentinfosDeleteState = {
  data: null,
  status: StudentinfosListStatus.IDLE,
  error: null,
};

const studentinfosDeleteSlice = createSlice({
  name: "studentinfosDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudentinfo.pending, (state) => {
        state.status = StudentinfosListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteStudentinfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteStudentinfo.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentinfosDeleteSlice.reducer;
