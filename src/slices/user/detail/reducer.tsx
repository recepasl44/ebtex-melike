import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUser } from './thunk'
import { UserDetailState } from '../../../types/user/detail'
import UserListStatus from '../../../enums/user/list'

const initialState: UserDetailState = {
    data: null,
    status: UserListStatus.IDLE,
    error: null,
}

const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = UserListStatus.LOADING
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default userDetailSlice.reducer
