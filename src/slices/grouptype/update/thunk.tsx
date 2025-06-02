import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GroupTypesUpdatePayload } from '../../../types/grouptype/update'
import { data } from '../../../types/grouptype/list'
import { GROUPTYPES } from '../../../helpers/url_helper'

export const updateGroupType = createAsyncThunk<data, GroupTypesUpdatePayload>(
    'grouptype/updateGroupType',
    async ({ groupTypeId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${GROUPTYPES}/${groupTypeId}`, payload)
            return resp.data.data as data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update group type failed')
        }
    }
)
