import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGroupTypes } from './thunk'
import { ListGroupTypesResponse } from '../../../types/grouptype/list'
import GroupTypeListStatus from '../../../enums/grouptype/list'

export interface GroupTypeListState {
    data: ListGroupTypesResponse['data'] | null
    links: ListGroupTypesResponse['links'] | null
    meta: ListGroupTypesResponse['meta'] | null
    status: GroupTypeListStatus
    error: string | null
}

const initialState: GroupTypeListState = {
    data: null,
    links: null,
    meta: null,
    status: GroupTypeListStatus.IDLE,
    error: null,
}

const groupTypeListSlice = createSlice({
    name: 'grouptype/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGroupTypes.pending, (state) => {
            state.status = GroupTypeListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchGroupTypes.fulfilled, (state, action: PayloadAction<ListGroupTypesResponse>) => {
            state.status = GroupTypeListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchGroupTypes.rejected, (state, action: PayloadAction<any>) => {
            state.status = GroupTypeListStatus.FAILED
            state.error = action.payload || 'Fetch group types failed'
        })
    },
})

export default groupTypeListSlice.reducer
