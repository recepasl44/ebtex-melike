import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveStudentStep2 } from './thunk';
import { StudentStep2State, StudentStep2Status } from '../../../types/student/step2';

const initialState: StudentStep2State = {
  data: null,
  status: StudentStep2Status.IDLE,
  error: null,
};

const studentStep2Slice = createSlice({
  name: 'student/step2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveStudentStep2.pending, (state) => {
      state.status = StudentStep2Status.LOADING;
      state.error = null;
    });
    builder.addCase(saveStudentStep2.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentStep2Status.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(saveStudentStep2.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentStep2Status.FAILED;
      state.error = action.payload || 'Save student step2 failed';
    });
  },
});

export default studentStep2Slice.reducer;
