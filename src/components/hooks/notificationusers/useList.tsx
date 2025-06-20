// file: src/components/hooks/notificationusers/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchNotificationUsers } from '../../../slices/notificationusers/list/thunk'
import {
    NotificationUsersData,
    ListNotificationUserArg,
    ListMeta
} from '../../../types/notificationusers/list'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'

export function useNotificationUsersList(params: ListNotificationUserArg) {
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
        (state: RootState) => state.notificationUserList
    )

    const restKey = JSON.stringify(restParams)

    const buildQuery = useCallback(() => {
        return {
            enabled,
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize
        } as ListNotificationUserArg
    }, [enabled, restKey, filter, page, pageSize])

    useEffect(() => {
        if (!enabled) return
        dispatch(fetchNotificationUsers(buildQuery()))
    }, [dispatch, enabled, buildQuery])

    const refetch = useCallback(() => {
        dispatch(fetchNotificationUsers(buildQuery()))
    }, [dispatch, buildQuery])

    const loading = status === NotificationUserListStatus.LOADING
    const notificationUsersData: NotificationUsersData[] = data || []
    const paginationMeta: ListMeta | null = meta || null
    const totalPages = paginationMeta?.last_page ?? 1
    const totalItems = paginationMeta?.total ?? 0

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
        refetch
    }
}
