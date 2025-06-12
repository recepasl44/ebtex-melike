import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { GROUPTYPES } from '../../../helpers/url_helper'
import { ListGroupTypesResponse, GroupTypesListArg } from '../../../types/grouptype/list'

export const fetchGroupTypes = createAsyncThunk<ListGroupTypesResponse, GroupTypesListArg>(
    'grouptype/fetchGroupTypes',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${GROUPTYPES}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListGroupTypesResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch group types failed')
        }
    }
)
