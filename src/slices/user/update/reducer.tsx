import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserListStatus from '../../../enums/user/list'
import { UserUpdateState } from '../../../types/user/update'
import { updateUser } from './thunk'

const initialState: UserUpdateState = {
    data: null,
    status: UserListStatus.IDLE,
    error: null,
}

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = UserListStatus.LOADING
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default userUpdateSlice.reducer
