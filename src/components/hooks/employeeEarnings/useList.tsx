import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchEmployeeEarnings } from '../../../slices/employeeEarnings/list/thunk'
import { data, meta, EarningListArg } from '../../../types/employeeEarnings/list'
import { EmployeeEarningsListStatus } from '../../../enums/employeeEarnings/list'

export function useEmployeeEarningsTable(params: EarningListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState<number>(params.page || 1)
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
  const [filter, setFilter] = useState<any>(null)
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.employeeEarningList
  )

  useEffect(() => {
    if (params?.enabled === false) return
    const { enabled = true, ...rest } = params
    const query: EarningListArg = {
      enabled,
      ...rest,
      filter,
      page,
      pageSize,
      per_page: pageSize
    }
    dispatch(fetchEmployeeEarnings(query))
  }, [dispatch, filter, page, pageSize, params])

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
