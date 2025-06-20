// file: src/components/hooks/notificationusers/useAdd.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addNotificationUser } from '../../../slices/notificationusers/add/thunk'
import { NotificationUsersAddPayload } from '../../../types/notificationusers/add'

export function useNotificationUserAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationUserAdd)

    const addNewNotificationUser = useCallback(
        async (payload: NotificationUsersAddPayload) => {
            const resultAction = await dispatch(addNotificationUser(payload))
            if (addNotificationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedNotificationUser: data, status, error, addNewNotificationUser }
}
