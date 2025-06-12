import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnrollmentAddState } from '../../../types/enrollments/add'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'
import { addEnrollment } from './thunk'

const initialState: EnrollmentAddState = {
  data: null,
  status: EnrollmentsListStatus.IDLE,
  error: null,
}

const enrollmentAddSlice = createSlice({
  name: 'enrollmentAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEnrollment.pending, (state) => {
        state.status = EnrollmentsListStatus.LOADING
        state.error = null
      })
      .addCase(addEnrollment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addEnrollment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default enrollmentAddSlice.reducer
