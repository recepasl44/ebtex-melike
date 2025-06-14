import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPS } from '../../../helpers/url_helper'
import { GroupsAddPayload } from '../../../types/group/add'
import { data } from '../../../types/group/list'

export const addGroup = createAsyncThunk<data, GroupsAddPayload>(
    'group/addGroup',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(GROUPS, payload)
            return resp.data.data as data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add group failed')
        }
    }
)
