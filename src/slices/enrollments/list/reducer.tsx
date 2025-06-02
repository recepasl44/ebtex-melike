import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnrollmentsListResponse } from '../../../types/enrollments/list'
import { fetchEnrollments } from './thunk'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'

export interface EnrollmentListState {
  data: EnrollmentsListResponse['data'] | null
  links: EnrollmentsListResponse['links'] | null
  meta: EnrollmentsListResponse['meta'] | null
  status: EnrollmentsListStatus
  error: string | null
}

const initialState: EnrollmentListState = {
  data: null,
  links: null,
  meta: null,
  status: EnrollmentsListStatus.IDLE,
  error: null,
}

const enrollmentListSlice = createSlice({
  name: 'enrollments/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.status = EnrollmentsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchEnrollments.fulfilled, (state, action: PayloadAction<EnrollmentsListResponse>) => {
        state.status = EnrollmentsListStatus.SUCCEEDED
        state.data = action.payload.data
        state.links = action.payload.links
        state.meta = action.payload.meta
      })
      .addCase(fetchEnrollments.rejected, (state, action: PayloadAction<any>) => {
        state.status = EnrollmentsListStatus.FAILED
        state.error = action.payload || 'Fetch enrollments failed'
      })
  },
})

export default enrollmentListSlice.reducer
