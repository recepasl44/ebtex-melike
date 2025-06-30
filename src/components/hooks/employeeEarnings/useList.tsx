import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchEmployeeEarnings } from '../../../slices/employeeEarnings/list/thunk'
import {
  data,
  meta,
  EarningListArg
} from '../../../types/employeeEarnings/list'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

export function useEmployeeEarningsTable(params: EarningListArg) {
  if (params?.enabled === false) {
    return {
      employeeEarningsData: [] as data[],
      loading: false,
      error: null,
      page: 1,
      setPage: () => { },
      pageSize: 10,
      setPageSize: () => { },
      filter: null,
      setFilter: () => { },
      totalPages: 1,
      totalItems: 0
    }
  }

  const {
    enabled = true,
    page: initialPage = 1,
    pageSize: initialPageSize = 10,
    ...restParams
  } = params

  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState<number>(initialPage)
  const [pageSize, setPageSize] = useState<number>(initialPageSize)
  const [filter, setFilter] = useState<any>(null)

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.employeeEarningList
  )

  const serializedRestParams = useMemo(
    () => JSON.stringify(restParams),
    [restParams]
  )

  useEffect(() => {
    if (!enabled) return

    const query: EarningListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize
    }

    dispatch(fetchEmployeeEarnings(query))
  }, [dispatch, enabled, serializedRestParams, filter, page, pageSize])

  const loading = status === EmployeeEarningsListStatus.LOADING
  const employeeEarningsData: data[] = data || []
  const paginationMeta: meta | null = meta
  const totalPages = paginationMeta ? paginationMeta.last_page : 1
  const totalItems = paginationMeta ? paginationMeta.total : 0

  return {
    employeeEarningsData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems
  }
}
