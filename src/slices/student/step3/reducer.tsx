import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveStudentStep3 } from './thunk';
import { StudentStep3State, StudentStep3Status } from '../../../types/student/step3';

const initialState: StudentStep3State = {
  data: null,
  status: StudentStep3Status.IDLE,
  error: null,
};

const studentStep3Slice = createSlice({
  name: 'student/step3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveStudentStep3.pending, (state) => {
      state.status = StudentStep3Status.LOADING;
      state.error = null;
    });
    builder.addCase(saveStudentStep3.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentStep3Status.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(saveStudentStep3.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentStep3Status.FAILED;
      state.error = action.payload || 'Save student step3 failed';
    });
  },
});

export default studentStep3Slice.reducer;
