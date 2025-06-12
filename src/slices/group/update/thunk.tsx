import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GroupsUpdatePayload } from '../../../types/group/update'
import { data } from '../../../types/group/list'
import { GROUPS } from '../../../helpers/url_helper'

export const updateGroup = createAsyncThunk<data, GroupsUpdatePayload>(
    'group/updateGroup',
    async ({ groupId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${GROUPS}/${groupId}`, payload)
            return resp.data.data as data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update group failed')
        }
    }
)
