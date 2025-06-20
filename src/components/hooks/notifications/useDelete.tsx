// file: src/components/hooks/notifications/useDelete.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteNotification } from '../../../slices/notifications/delete/thunk'

export function useNotificationDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationDelete)

    const deleteExistingNotification = useCallback(
        async (notificationId: number) => {
            const resultAction = await dispatch(deleteNotification(notificationId))
            if (deleteNotification.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedNotification: data, status, error, deleteExistingNotification }
}
