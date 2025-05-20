import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteGroupType } from './thunk'
import { GroupTypesDeleteState } from '../../../types/grouptype/delete'
import GroupTypeListStatus from '../../../enums/grouptype/list'

const initialState: GroupTypesDeleteState = {
    data: null,
    status: GroupTypeListStatus.IDLE,
    error: null,
}

const groupTypeDeleteSlice = createSlice({
    name: 'grouptypeDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteGroupType.pending, (state) => {
                state.status = GroupTypeListStatus.LOADING
                state.error = null
            })
            .addCase(deleteGroupType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteGroupType.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupTypeDeleteSlice.reducer
