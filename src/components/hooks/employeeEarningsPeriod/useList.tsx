import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchEmployeeEarningsPeriodList } from '../../../slices/employeeEarningsPeriod/list/thunk'
import {
  EmployeeEarningsPeriodData,
  EmployeeEarningsPeriodListArgs,
  PaginationMeta
} from '../../../types/employeeEarningsPeriod/list'
import EmployeeEarningsPeriodListStatus from '../../../enums/employeeEarningsPeriod/list'

export function useEmployeeEarningsPeriodTable(params: EmployeeEarningsPeriodListArgs) {
  if (params?.enabled === false) {
    return {
      employeeEarningsPeriodData: [] as EmployeeEarningsPeriodData[],
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

  const { data, status, error, meta } = useSelector(
    (state: RootState) => state.employeeEarningsPeriodList
  )

  const serializedRestParams = useMemo(
    () => JSON.stringify(restParams),
    [restParams]
  )

  useEffect(() => {
    if (!enabled) return

    const query: EmployeeEarningsPeriodListArgs = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize
    }

    dispatch(fetchEmployeeEarningsPeriodList(query))
  }, [dispatch, enabled, serializedRestParams, filter, page, pageSize])

  const loading = status === EmployeeEarningsPeriodListStatus.LOADING
  const employeeEarningsPeriodData: EmployeeEarningsPeriodData[] = data || []
  const paginationMeta: PaginationMeta | null = meta
  const totalPages = paginationMeta ? paginationMeta.last_page : 1
  const totalItems = paginationMeta ? paginationMeta.total : 0

  return {
    employeeEarningsPeriodData,
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
