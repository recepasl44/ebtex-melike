import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addGroup } from './thunk'
import { GroupsAddState } from '../../../types/group/add'
import GroupListStatus from '../../../enums/group/list'

const initialState: GroupsAddState = {
    data: null,
    status: GroupListStatus.IDLE,
    error: null,
}

const groupAddSlice = createSlice({
    name: 'groupAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addGroup.pending, (state) => {
                state.status = GroupListStatus.LOADING
                state.error = null
            })
            .addCase(addGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupAddSlice.reducer
