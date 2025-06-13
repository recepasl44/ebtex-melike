import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPS } from '../../../helpers/url_helper'
import { GroupDetailState } from '../../../types/group/detail'

export const fetchGroup = createAsyncThunk<GroupDetailState, number>(
    'group/fetchGroup',
    async (groupId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${GROUPS}/${groupId}`)
            return response.data.data as GroupDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch group failed')
        }
    }
)
