// file: src\components\hooks\messages\useDetail.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchMessage } from '../../../slices/messages/detail/thunk'

export function useMessageDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.messageShow)

  const getMessage = useCallback(
    async (messageId: number) => {
      const resultAction = await dispatch(fetchMessage(messageId))
      if (fetchMessage.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { message: data, status, error, getMessage }
}
