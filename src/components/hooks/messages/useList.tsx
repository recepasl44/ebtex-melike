// file: src/components/hooks/messages/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchMessages } from '../../../slices/messages/list/thunk'
import { MessageData, ListMessageArg, ListMeta } from '../../../types/messages/list'
import { MessageListStatus } from '../../../enums/messages/list'

export function useMessagesList(params: ListMessageArg) {
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
        (state: RootState) => state.messageList
    )

    const restKey = JSON.stringify(restParams)

    const buildQuery = useCallback((): ListMessageArg => ({
        conversation_id: restParams.conversation_id,
        paginate: page,
        per_page: pageSize,
        orderBy: 'created_at',
        sortBy: 'desc'
    }), [restParams.conversation_id, page, pageSize])

    useEffect(() => {
        if (!enabled) return
        dispatch(fetchMessages(buildQuery()))
    }, [dispatch, enabled, buildQuery])

    const refetch = useCallback(() => {
        dispatch(fetchMessages(buildQuery()))
    }, [dispatch, buildQuery])

    const loading = status === MessageListStatus.LOADING
    const messagesData: MessageData[] = data || []
    const paginationMeta: ListMeta | null = meta || null
    const totalPages = paginationMeta?.last_page ?? 1
    const totalItems = paginationMeta?.total ?? 0

    return {
        messagesData,
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
