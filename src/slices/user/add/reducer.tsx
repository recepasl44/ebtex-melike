import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addUser } from './thunk'
import { UserAddState } from '../../../types/user/add'
import UserListStatus from '../../../enums/user/list'

const initialState: UserAddState = {
    data: null,
    status: UserListStatus.IDLE,
    error: null,
}

const userAddSlice = createSlice({
    name: 'userAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.status = UserListStatus.LOADING
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = UserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default userAddSlice.reducer
