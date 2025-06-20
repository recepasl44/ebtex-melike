// file: src/components/hooks/conversationusers/useDetail.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchConversationUser } from '../../../slices/conversationusers/detail/thunk'

export function useConversationUserDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationUserShow)

    const getConversationUser = useCallback(
        async (conversationUserId: number) => {
            const resultAction = await dispatch(fetchConversationUser(conversationUserId))
            if (fetchConversationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { conversationUser: data, status, error, getConversationUser }
}
