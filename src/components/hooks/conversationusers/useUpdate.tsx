// file: src/components/hooks/conversationusers/useUpdate.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateConversationUser } from '../../../slices/conversationusers/update/thunk'
import { ConversationUsersUpdatePayload } from '../../../types/conversationusers/update'

export function useConversationUserUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationUserUpdate)

    const updateExistingConversationUser = useCallback(
        async (payload: ConversationUsersUpdatePayload) => {
            const resultAction = await dispatch(updateConversationUser(payload))
            if (updateConversationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedConversationUser: data, status, error, updateExistingConversationUser }
}
