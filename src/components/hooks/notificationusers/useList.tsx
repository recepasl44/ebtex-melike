// file: src/components/hooks/notificationusers/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchNotificationUsers } from '../../../slices/notificationusers/list/thunk'
import { NotificationUsersData, ListNotificationUserArg, ListMeta } from '../../../types/notificationusers/list'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'

export function useNotificationUsersList(params: ListNotificationUserArg) {
    if (params?.enabled === false) return
    const dispatch = useDispatch<AppDispatch>()

    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
    const [filter, setFilter] = useState<any>(null)

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.notificationUserList
    )

    const buildQuery = () => {
        const { enabled, ...restParams } = params
        return {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as ListNotificationUserArg
    }

    useEffect(() => {
        dispatch(fetchNotificationUsers(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const refetch = useCallback(() => {
        dispatch(fetchNotificationUsers(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === NotificationUserListStatus.LOADING
    const notificationUsersData: NotificationUsersData[] = data || []
    const paginationMeta: ListMeta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

    return {
        notificationUsersData,
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
