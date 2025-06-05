import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveStudentStep1 } from './thunk';
import { StudentStep1State, StudentStep1Status } from '../../../types/student/step1';

const initialState: StudentStep1State = {
  data: null,
  status: StudentStep1Status.IDLE,
  error: null,
};

const studentStep1Slice = createSlice({
  name: 'student/step1',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveStudentStep1.pending, (state) => {
      state.status = StudentStep1Status.LOADING;
      state.error = null;
    });
    builder.addCase(saveStudentStep1.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentStep1Status.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(saveStudentStep1.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentStep1Status.FAILED;
      state.error = action.payload || 'Save student step1 failed';
    });
  },
});

export default studentStep1Slice.reducer;
