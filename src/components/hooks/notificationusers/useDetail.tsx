// file: src/components/hooks/notificationusers/useDetail.tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchNotificationUser } from '../../../slices/notificationusers/detail/thunk'

export function useNotificationUserDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.notificationUserShow)

    const getNotificationUser = useCallback(
        async (notificationUserId: number) => {
            const resultAction = await dispatch(fetchNotificationUser(notificationUserId))
            if (fetchNotificationUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { notificationUser: data, status, error, getNotificationUser }
}
