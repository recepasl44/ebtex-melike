// file: src/slices/conversations/add/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addConversation } from './thunk'
import { ConversationsAddState } from '../../../types/conversations/add'
import { ConversationListStatus } from '../../../enums/conversations/list'
import { ConversationData } from '../../../types/conversations/list'

const initialState: ConversationsAddState = {
    data: null,
    status: ConversationListStatus.IDLE,
    error: null,
}

const conversationsAddSlice = createSlice({
    name: 'conversationsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addConversation.pending, (state) => {
                state.status = ConversationListStatus.LOADING
                state.error = null
            })
            .addCase(addConversation.fulfilled, (state, action: PayloadAction<ConversationData>) => {
                state.status = ConversationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addConversation.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationsAddSlice.reducer
