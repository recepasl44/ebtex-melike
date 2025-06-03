import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPS } from '../../../helpers/url_helper'
import { ListGroupsResponse, GroupsListArg } from '../../../types/group/list'

export const fetchGroups = createAsyncThunk<ListGroupsResponse, GroupsListArg>(
    'group/fetchGroups',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${GROUPS}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListGroupsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch groups failed')
        }
    }
)
