// file: src/components/hooks/conversationusers/useDelete.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteConversationUser } from '../../../slices/conversationusers/delete/thunk'

export function useConversationUserDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationUserDelete)

    const deleteExistingConversationUser = useCallback(
        async (conversationUserId: number) => {
            const resultAction = await dispatch(deleteConversationUser(conversationUserId))
            if (deleteConversationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedConversationUser: data, status, error, deleteExistingConversationUser }
}
