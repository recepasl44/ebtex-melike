// file: src/components/hooks/conversations/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchConversations } from '../../../slices/conversations/list/thunk'
import { ConversationData, ListConversationArg, ListMeta } from '../../../types/conversations/list'
import { ConversationListStatus } from '../../../enums/conversations/list'

export function useConversationsList(params: ListConversationArg) {
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
        (state: RootState) => state.conversationList
    )

    const restKey = JSON.stringify(restParams)

    const buildQuery = useCallback((): ListConversationArg => ({
        ...restParams,
        filter,
        paginate: page,
        per_page: pageSize,
        orderBy: 'created_at',
        sortBy: 'desc'
    }), [restKey, filter, page, pageSize])

    useEffect(() => {
        if (!enabled) return
        dispatch(fetchConversations(buildQuery()))
    }, [dispatch, enabled, buildQuery])

    const refetch = useCallback(() => {
        dispatch(fetchConversations(buildQuery()))
    }, [dispatch, buildQuery])

    const loading = status === ConversationListStatus.LOADING
    const conversationsData: ConversationData[] = data || []
    const paginationMeta: ListMeta | null = meta || null
    const totalPages = paginationMeta?.last_page ?? 1
    const totalItems = paginationMeta?.total ?? 0

    return {
        conversationsData,
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
