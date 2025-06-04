import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ENROLLMENTS } from '../../../helpers/url_helper'
import { EnrollmentUpdatePayload } from '../../../types/enrollments/update'
import { Enrollment } from '../../../types/enrollments/list'

export const updateEnrollment = createAsyncThunk<Enrollment, EnrollmentUpdatePayload>(
  'enrollments/updateEnrollment',
  async ({ enrollmentId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${ENROLLMENTS}/${enrollmentId}`, payload)
      return resp.data.data as Enrollment
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update enrollment failed')
    }
  }
)
