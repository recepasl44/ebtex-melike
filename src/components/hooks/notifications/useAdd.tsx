// file: src/components/hooks/notifications/useAdd.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addNotification } from '../../../slices/notifications/add/thunk'
import { NotificationsAddPayload } from '../../../types/notifications/add'

export function useNotificationAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationAdd)

    const addNewNotification = useCallback(
        async (payload: NotificationsAddPayload) => {
            const resultAction = await dispatch(addNotification(payload))
            if (addNotification.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedNotification: data, status, error, addNewNotification }
}
