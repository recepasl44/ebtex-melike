import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers } from './thunk'
import { ListUsersResponse } from '../../../types/user/list'
import UserListStatus from '../../../enums/user/list'

export interface UserListState {
    data: ListUsersResponse['data'] | null
    links: ListUsersResponse['links'] | null
    meta: ListUsersResponse['meta'] | null
    status: UserListStatus
    error: string | null
}

const initialState: UserListState = {
    data: null,
    links: null,
    meta: null,
    status: UserListStatus.IDLE,
    error: null,
}

const userListSlice = createSlice({
    name: 'user/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = UserListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<ListUsersResponse>) => {
            state.status = UserListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
            state.status = UserListStatus.FAILED
            state.error = action.payload || 'Fetch users failed'
        })
    },
})

export default userListSlice.reducer
