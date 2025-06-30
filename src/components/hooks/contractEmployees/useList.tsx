import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchContractEmployees } from '../../../slices/contractEmployees/list/thunk'
import { data, meta, ContractEmployeeListArg } from '../../../types/contractEmployees/list'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

export function useContractEmployeesTable(params: ContractEmployeeListArg) {
  if (params?.enabled === false) {
    return {
      contractEmployeesData: [] as data[],
      loading: false,
      error: null,
      page: 1,
      setPage: () => {},
      pageSize: 10,
      setPageSize: () => {},
      filter: null,
      setFilter: () => {},
      totalPages: 1,
      totalItems: 0
    }
  }

  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState<number>(params.page || 1)
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
  const [filter, setFilter] = useState<any>(null)

  const { data, meta, status, error } = useSelector((state: RootState) => state.contractEmployeeList)

  useEffect(() => {
    const { enabled = true, ...restParams } = params
    if (!enabled) return

    const query: ContractEmployeeListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize
    }

    dispatch(fetchContractEmployees(query))
  }, [dispatch, filter, page, pageSize, params])

  const loading = status === ContractEmployeesListStatus.LOADING
  const contractEmployeesData: data[] = data || []
  const paginationMeta: meta | null = meta
  const totalPages = paginationMeta ? paginationMeta.last_page : 1
  const totalItems = paginationMeta ? paginationMeta.total : 0

  return {
    contractEmployeesData,
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
