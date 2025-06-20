// file: src/components/hooks/conversationusers/useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchConversationUsers } from '../../../slices/conversationusers/list/thunk'
import { ConversationUsersData, ListConversationUserArg, ListMeta } from '../../../types/conversationusers/list'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'

export function useConversationUsersList(params: ListConversationUserArg) {
    if (params?.enabled === false) return
    const dispatch = useDispatch<AppDispatch>()

    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
    const [filter, setFilter] = useState<any>(null)

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.conversationUserList
    )

    const buildQuery = () => {
        const { enabled, ...restParams } = params
        return {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as ListConversationUserArg
    }

    useEffect(() => {
        dispatch(fetchConversationUsers(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const refetch = useCallback(() => {
        dispatch(fetchConversationUsers(buildQuery()))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === ConversationUserListStatus.LOADING
    const conversationUsersData: ConversationUsersData[] = data || []
    const paginationMeta: ListMeta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

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
        refetch,
    }
}
