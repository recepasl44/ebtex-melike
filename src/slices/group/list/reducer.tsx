import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGroups } from './thunk'
import { ListGroupsResponse } from '../../../types/group/list'
import GroupListStatus from '../../../enums/group/list'

export interface GroupListState {
    data: ListGroupsResponse['data'] | null
    links: ListGroupsResponse['links'] | null
    meta: ListGroupsResponse['meta'] | null
    status: GroupListStatus
    error: string | null
}

const initialState: GroupListState = {
    data: null,
    links: null,
    meta: null,
    status: GroupListStatus.IDLE,
    error: null,
}

const groupListSlice = createSlice({
    name: 'group/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGroups.pending, (state) => {
            state.status = GroupListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchGroups.fulfilled, (state, action: PayloadAction<ListGroupsResponse>) => {
            state.status = GroupListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchGroups.rejected, (state, action: PayloadAction<any>) => {
            state.status = GroupListStatus.FAILED
            state.error = action.payload || 'Fetch groups failed'
        })
    },
})

export default groupListSlice.reducer
