// file: src/components/hooks/notificationusers/useUpdate.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateNotificationUser } from '../../../slices/notificationusers/update/thunk'
import { NotificationUsersUpdatePayload } from '../../../types/notificationusers/update'

export function useNotificationUserUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationUserUpdate)

    const updateExistingNotificationUser = useCallback(
        async (payload: NotificationUsersUpdatePayload) => {
            const resultAction = await dispatch(updateNotificationUser(payload))
            if (updateNotificationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedNotificationUser: data, status, error, updateExistingNotificationUser }
}
