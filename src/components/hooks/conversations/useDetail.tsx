// file: src/components/hooks/conversations/useDetail.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchConversation } from '../../../slices/conversations/detail/thunk'

export function useConversationDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationShow)

    const getConversation = useCallback(
        async (conversationId: number) => {
            const resultAction = await dispatch(fetchConversation(conversationId))
            if (fetchConversation.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { conversation: data, status, error, getConversation }
}
