// file: src/components/hooks/notifications/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchNotifications } from '../../../slices/notifications/list/thunk'
import { NotificationData, ListNotificationArg, ListMeta } from '../../../types/notifications/list'
import { NotificationListStatus } from '../../../enums/notifications/list'

export function useNotificationsList(params: ListNotificationArg) {
    if (params?.enabled === false) return
    const dispatch = useDispatch<AppDispatch>()

    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
    const [filter, setFilter] = useState<any>(null)

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.notificationList
    )

    const buildQuery = () => {
        const { enabled, ...restParams } = params
        return {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as ListNotificationArg
    }

    useEffect(() => {
        dispatch(fetchNotifications(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const refetch = useCallback(() => {
        dispatch(fetchNotifications(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === NotificationListStatus.LOADING
    const notificationsData: NotificationData[] = data || []
    const paginationMeta: ListMeta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

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
        refetch,
    }
}
