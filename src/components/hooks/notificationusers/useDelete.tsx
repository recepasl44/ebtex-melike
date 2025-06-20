// file: src/components/hooks/notificationusers/useDelete.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteNotificationUser } from '../../../slices/notificationusers/delete/thunk'

export function useNotificationUserDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationUserDelete)

    const deleteExistingNotificationUser = useCallback(
        async (notificationUserId: number) => {
            const resultAction = await dispatch(deleteNotificationUser(notificationUserId))
            if (deleteNotificationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedNotificationUser: data, status, error, deleteExistingNotificationUser }
}
