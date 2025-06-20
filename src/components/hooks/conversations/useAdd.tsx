// file: src/components/hooks/conversations/useAdd.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addConversation } from '../../../slices/conversations/add/thunk'
import { ConversationsAddPayload } from '../../../types/conversations/add'

export function useConversationAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationAdd)

    const addNewConversation = useCallback(
        async (payload: ConversationsAddPayload) => {
            const resultAction = await dispatch(addConversation(payload))
            if (addConversation.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedConversation: data, status, error, addNewConversation }
}
