// file: src/components/hooks/notifications/useDetail.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchNotification } from '../../../slices/notifications/detail/thunk'

export function useNotificationDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationShow)

    const getNotification = useCallback(
        async (notificationId: number) => {
            const resultAction = await dispatch(fetchNotification(notificationId))
            if (fetchNotification.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { notification: data, status, error, getNotification }
}
