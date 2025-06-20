// file: src/components/hooks/notifications/useUpdate.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateNotification } from '../../../slices/notifications/update/thunk'
import { NotificationsUpdatePayload } from '../../../types/notifications/update'

export function useNotificationUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationUpdate)

    const updateExistingNotification = useCallback(
        async (payload: NotificationsUpdatePayload) => {
            const resultAction = await dispatch(updateNotification(payload))
            if (updateNotification.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedNotification: data, status, error, updateExistingNotification }
}
