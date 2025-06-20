// file: src/components/hooks/conversations/useUpdate.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateConversation } from '../../../slices/conversations/update/thunk'
import { ConversationsUpdatePayload } from '../../../types/conversations/update'

export function useConversationUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationUpdate)

    const updateExistingConversation = useCallback(
        async (payload: ConversationsUpdatePayload) => {
            const resultAction = await dispatch(updateConversation(payload))
            if (updateConversation.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedConversation: data, status, error, updateExistingConversation }
}
