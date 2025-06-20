// file: src/components/hooks/conversations/useDelete.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteConversation } from '../../../slices/conversations/delete/thunk'

export function useConversationDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationDelete)

    const deleteExistingConversation = useCallback(
        async (conversationId: number) => {
            const resultAction = await dispatch(deleteConversation(conversationId))
            if (deleteConversation.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedConversation: data, status, error, deleteExistingConversation }
}
