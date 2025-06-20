// file: src/components/hooks/messages/useAdd.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addMessage } from '../../../slices/messages/add/thunk'
import { MessagesAddPayload } from '../../../types/messages/add'

export function useMessageAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.messageAdd)

    const addNewMessage = useCallback(
        async (payload: MessagesAddPayload) => {
            const resultAction = await dispatch(addMessage(payload))
            if (addMessage.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedMessage: data, status, error, addNewMessage }
}
