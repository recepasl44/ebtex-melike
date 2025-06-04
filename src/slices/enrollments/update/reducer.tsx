import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnrollmentUpdateState } from '../../../types/enrollments/update'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'
import { updateEnrollment } from './thunk'

const initialState: EnrollmentUpdateState = {
  data: null,
  status: EnrollmentsListStatus.IDLE,
  error: null,
}

const enrollmentUpdateSlice = createSlice({
  name: 'enrollmentUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEnrollment.pending, (state) => {
        state.status = EnrollmentsListStatus.LOADING
        state.error = null
      })
      .addCase(updateEnrollment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateEnrollment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default enrollmentUpdateSlice.reducer
