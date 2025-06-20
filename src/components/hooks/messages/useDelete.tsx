// file: src\components\hooks\messages\useDelete.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteMessage } from '../../../slices/messages/delete/thunk'

export function useMessageDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.messageDelete)

  const deleteExistingMessage = useCallback(
    async (messageId: number) => {
      const resultAction = await dispatch(deleteMessage(messageId))
      if (deleteMessage.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedMessage: data, status, error, deleteExistingMessage }
}
