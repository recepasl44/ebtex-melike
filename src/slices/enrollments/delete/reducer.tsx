import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnrollmentDeleteState } from '../../../types/enrollments/delete'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'
import { deleteEnrollment } from './thunk'

const initialState: EnrollmentDeleteState = {
  data: null,
  status: EnrollmentsListStatus.IDLE,
  error: null,
}

const enrollmentDeleteSlice = createSlice({
  name: 'enrollmentDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteEnrollment.pending, (state) => {
        state.status = EnrollmentsListStatus.LOADING
        state.error = null
      })
      .addCase(deleteEnrollment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteEnrollment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default enrollmentDeleteSlice.reducer
