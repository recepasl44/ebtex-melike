// file: src/components/hooks/notifications/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchNotifications } from '../../../slices/notifications/list/thunk'
import { NotificationData, ListNotificationArg, ListMeta } from '../../../types/notifications/list'
import { NotificationListStatus } from '../../../enums/notifications/list'

export function useNotificationsList(params: ListNotificationArg) {
    const dispatch = useDispatch<AppDispatch>()
    const {
        enabled = true,
        page: initialPage = 1,
        pageSize: initialSize = 10,
        ...restParams
    } = params

    const [page, setPage] = useState<number>(initialPage)
    const [pageSize, setPageSize] = useState<number>(initialSize)
    const [filter, setFilter] = useState<any>(null)

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.notificationList
    )

    // stringify restParams to stabilize dependency
    const restKey = JSON.stringify(restParams)

    const buildQuery = useCallback((): ListNotificationArg => ({
        enabled,
        ...restParams,
        filter,
        page,
        pageSize,
        per_page: pageSize
    }), [enabled, restKey, filter, page, pageSize])

    useEffect(() => {
        if (!enabled) return
        dispatch(fetchNotifications(buildQuery()))
    }, [dispatch, enabled, buildQuery])

    const refetch = useCallback(() => {
        dispatch(fetchNotifications(buildQuery()))
    }, [dispatch, buildQuery])

    const loading = status === NotificationListStatus.LOADING
    const notificationsData: NotificationData[] = data || []
    const paginationMeta: ListMeta | null = meta || null
    const totalPages = paginationMeta?.last_page ?? 1
    const totalItems = paginationMeta?.total ?? 0

    return {
        notificationsData,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages,
        totalItems,
        refetch
    }
}
