import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchBulletins } from '../../../slices/bulletins/list/thunk'
import { data, meta, BulletinListArg } from '../../../types/bulletins/list'
import { BulletinsListStatus } from '../../../enums/bulletins/list'

export function useBulletinsTable(params: BulletinListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const { enabled = true, page: initialPage = 1, pageSize: initialSize = 10, ...restParams } = params
  const [page, setPage] = useState<number>(initialPage)
  const [pageSize, setPageSize] = useState<number>(initialSize)
  const [filter, setFilter] = useState<any>(null)

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.bulletinList
  )

  useEffect(() => {
    if (!enabled) return
    const query: BulletinListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    }
    dispatch(fetchBulletins(query))
  }, [
    dispatch,
    enabled,
    filter,
    page,
    pageSize,
    JSON.stringify(restParams),
  ])

  const loading = status === BulletinsListStatus.LOADING
  const bulletinsData: data[] = data || []
  const paginationMeta: meta | null = meta || null
  const totalPages = paginationMeta?.last_page ?? 1
  const totalItems = paginationMeta?.total ?? 0

  return {
    bulletinsData,
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
  }
}
