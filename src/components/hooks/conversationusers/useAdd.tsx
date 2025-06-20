// file: src/components/hooks/conversationusers/useAdd.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addConversationUser } from '../../../slices/conversationusers/add/thunk'
import { ConversationUsersAddPayload } from '../../../types/conversationusers/add'

export function useConversationUserAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.conversationUserAdd)

    const addNewConversationUser = useCallback(
        async (payload: ConversationUsersAddPayload) => {
            const resultAction = await dispatch(addConversationUser(payload))
            if (addConversationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedConversationUser: data, status, error, addNewConversationUser }
}
