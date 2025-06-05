import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ENROLLMENTS } from '../../../helpers/url_helper'
import { EnrollmentDeleteState } from '../../../types/enrollments/delete'

export const deleteEnrollment = createAsyncThunk<EnrollmentDeleteState, number>(
  'enrollments/deleteEnrollment',
  async (enrollmentId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${ENROLLMENTS}/${enrollmentId}`)
      return resp.data as EnrollmentDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete enrollment failed')
    }
  }
)
