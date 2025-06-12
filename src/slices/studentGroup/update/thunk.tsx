import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { Data } from '../../../types/studentGroup/list'
import { StudentGroupsUpdatePayload } from '../../../types/studentGroup/update'
import { STUDENTGROUPS } from '../../../helpers/url_helper'

export const updateStudentGroup = createAsyncThunk<Data, StudentGroupsUpdatePayload>(
    'studentGroup/updateStudentGroup',
    async ({ studentGroupId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${STUDENTGROUPS}/${studentGroupId}`, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update student group failed')
        }
    }
)
