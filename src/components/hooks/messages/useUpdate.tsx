// file: src/components/hooks/messages/useUpdate.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateMessage } from '../../../slices/messages/update/thunk'
import { MessagesUpdatePayload } from '../../../types/messages/update'

export function useMessageUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.messageUpdate)

    const updateExistingMessage = useCallback(
        async (payload: MessagesUpdatePayload) => {
            const resultAction = await dispatch(updateMessage(payload))
            if (updateMessage.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedMessage: data, status, error, updateExistingMessage }
}
