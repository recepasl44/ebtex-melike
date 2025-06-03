import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { STUDENTGROUPS } from '../../../helpers/url_helper'
import { StudentGroupsDeleteState } from '../../../types/studentGroup/delete'

export const deleteStudentGroup = createAsyncThunk<StudentGroupsDeleteState, number>(
    'studentGroup/deleteStudentGroup',
    async (studentGroupId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${STUDENTGROUPS}/${studentGroupId}`)
            return resp.data as StudentGroupsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete student group failed')
        }
    }
)
