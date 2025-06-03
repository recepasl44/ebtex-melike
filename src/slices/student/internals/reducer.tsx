import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchStudentInternals } from './thunk';
import { StudentInternalsState, StudentInternalsStatus } from '../../../types/student/internals';

const initialState: StudentInternalsState = {
  data: null,
  status: StudentInternalsStatus.IDLE,
  error: null,
};

const studentInternalsSlice = createSlice({
  name: 'student/internals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentInternals.pending, (state) => {
      state.status = StudentInternalsStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchStudentInternals.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentInternalsStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(fetchStudentInternals.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentInternalsStatus.FAILED;
      state.error = action.payload || 'Fetch student internals failed';
    });
  },
});

export default studentInternalsSlice.reducer;
