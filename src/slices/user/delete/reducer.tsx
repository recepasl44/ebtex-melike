import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteUser } from './thunk'
import { UserDeleteState } from '../../../types/user/delete'
import UserListStatus from '../../../enums/user/list'

const initialState: UserDeleteState = {
    data: null,
    status: UserListStatus.IDLE,
    error: null,
}

const userDeleteSlice = createSlice({
    name: 'userDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.status = UserListStatus.LOADING
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default userDeleteSlice.reducer
