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

    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
    const [filter, setFilter] = useState<any>(null)

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.conversationList
    )

    const buildQuery = () => {
        const { enabled, ...restParams } = params
        return {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as ListConversationArg
    }

    useEffect(() => {
        if (params?.enabled === false) return;
        dispatch(fetchConversations(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const refetch = useCallback(() => {
        dispatch(fetchConversations(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === ConversationListStatus.LOADING
    const conversationsData: ConversationData[] = data || []
    const paginationMeta: ListMeta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

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
