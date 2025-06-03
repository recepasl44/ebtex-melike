import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPTYPES } from '../../../helpers/url_helper'
import { GroupTypesDeleteState } from '../../../types/grouptype/delete'

export const deleteGroupType = createAsyncThunk<GroupTypesDeleteState, number>(
    'grouptype/deleteGroupType',
    async (groupTypeId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${GROUPTYPES}/${groupTypeId}`)
            return resp.data as GroupTypesDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete group type failed')
        }
    }
)
