// file: src\components\hooks\messages\useList.tsx
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchMessages } from '../../../slices/messages/list/thunk'
import { ListMessagesResponse, ListMessageArg, MessagesMeta } from '../../../types/messages/list'
import { MessageListStatus } from '../../../enums/messages/list'

export function useMessagesList(params: ListMessageArg) {
  const dispatch = useDispatch<AppDispatch>()

  const [page, setPage] = useState<number>(params.page || 1)
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
  const [filter, setFilter] = useState<any>(null)

  const { data, meta, status, error } = useSelector((state: RootState) => state.messageList)

  const buildQuery = () => {
    const { enabled, ...rest } = params
    return {
      ...rest,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    } as ListMessageArg
  }

  useEffect(() => {
    if (params?.enabled === false) return
    dispatch(fetchMessages(buildQuery()))
  }, [dispatch, filter, page, pageSize, params])

  const refetch = useCallback(() => {
    dispatch(fetchMessages(buildQuery()))
  }, [dispatch, filter, page, pageSize, params])

  const loading = status === MessageListStatus.LOADING
  const messagesData: ListMessagesResponse['data'] = data || []
  const paginationMeta: MessagesMeta | null = meta
  const totalPages = paginationMeta ? paginationMeta.last_page : 1
  const totalItems = paginationMeta ? paginationMeta.total : 0

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
