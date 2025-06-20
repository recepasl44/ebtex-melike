// file: src/components/hooks/conversationusers/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchConversationUsers } from '../../../slices/conversationusers/list/thunk'
import {
    ConversationUsersData,
    ListConversationUserArg,
    ListMeta
} from '../../../types/conversationusers/list'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'

export function useConversationUsersList(params: ListConversationUserArg) {
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
        (state: RootState) => state.conversationUserList
    )

    const restKey = JSON.stringify(restParams)

    const buildQuery = useCallback((): ListConversationUserArg => ({
        enabled,
        ...restParams,
        filter,
        page,
        pageSize,
        per_page: pageSize
    }), [enabled, restKey, filter, page, pageSize])

    useEffect(() => {
        if (!enabled) return
        dispatch(fetchConversationUsers(buildQuery()))
    }, [dispatch, enabled, buildQuery])

    const refetch = useCallback(() => {
        dispatch(fetchConversationUsers(buildQuery()))
    }, [dispatch, buildQuery])

    const loading = status === ConversationUserListStatus.LOADING
    const conversationUsersData: ConversationUsersData[] = data || []
    const paginationMeta: ListMeta | null = meta || null
    const totalPages = paginationMeta?.last_page ?? 1
    const totalItems = paginationMeta?.total ?? 0

    return {
        conversationUsersData,
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
