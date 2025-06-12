import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { importStudents } from './thunk';
import { StudentImportState, StudentImportStatus } from '../../../types/student/import';

const initialState: StudentImportState = {
  data: null,
  status: StudentImportStatus.IDLE,
  error: null,
};

const studentImportSlice = createSlice({
  name: 'student/import',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(importStudents.pending, (state) => {
      state.status = StudentImportStatus.LOADING;
      state.error = null;
    });
    builder.addCase(importStudents.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentImportStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(importStudents.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentImportStatus.FAILED;
      state.error = action.payload || 'Student import failed';
    });
  },
});

export default studentImportSlice.reducer;
