import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPS } from '../../../helpers/url_helper'
import { GroupsDeleteState } from '../../../types/group/delete'

export const deleteGroup = createAsyncThunk<GroupsDeleteState, number>(
    'group/deleteGroup',
    async (groupId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${GROUPS}/${groupId}`)
            return resp.data as GroupsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete group failed')
        }
    }
)
