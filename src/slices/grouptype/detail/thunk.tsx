import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPTYPES } from '../../../helpers/url_helper'
import { GroupTypeDetailState } from '../../../types/grouptype/detail'

export const fetchGroupType = createAsyncThunk<GroupTypeDetailState, number>(
    'grouptype/fetchGroupType',
    async (groupTypeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${GROUPTYPES}/${groupTypeId}`)
            return response.data.data as GroupTypeDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch group type failed')
        }
    }
)
