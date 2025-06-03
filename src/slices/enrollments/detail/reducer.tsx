import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnrollmentDetailState } from '../../../types/enrollments/detail'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'
import { fetchEnrollment } from './thunk'

const initialState: EnrollmentDetailState = {
  data: null,
  status: EnrollmentsListStatus.IDLE,
  error: null,
}

const enrollmentDetailSlice = createSlice({
  name: 'enrollmentDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollment.pending, (state) => {
        state.status = EnrollmentsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchEnrollment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchEnrollment.rejected, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default enrollmentDetailSlice.reducer
