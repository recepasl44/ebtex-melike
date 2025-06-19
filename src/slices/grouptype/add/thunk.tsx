import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPTYPES } from '../../../helpers/url_helper'
import { GroupTypesAddPayload } from '../../../types/grouptype/add'
import { data } from '../../../types/grouptype/list'

export const addGroupType = createAsyncThunk<data, GroupTypesAddPayload>(
    'grouptype/addGroupType',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(GROUPTYPES, payload)
            return resp.data.data as data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add group type failed')
        }
    }
)
