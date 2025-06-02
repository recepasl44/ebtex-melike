import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { STUDENTGROUPS } from '../../../helpers/url_helper'
import { StudentGroupDetailState } from '../../../types/studentGroup/detail'

export const fetchStudentGroup = createAsyncThunk<StudentGroupDetailState, number>(
    'studentGroup/fetchStudentGroup',
    async (studentGroupId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${STUDENTGROUPS}/${studentGroupId}`)
            return response.data.data as StudentGroupDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch student group failed')
        }
    }
)
