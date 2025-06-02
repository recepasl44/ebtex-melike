import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchSupplierDebts } from '../../../slices/supplierDebts/list/thunk'
import { SupplierDebtData, SupplierDebtsListArg } from '../../../types/supplierDebts/list'
import SupplierDebtsListStatus from '../../../enums/supplierDebts/list'

export function useSupplierDebtsList(params: SupplierDebtsListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const [filter
  ] = useState<any>(null);

  const [page, setPage] = useState<number>(params.page || 1)
  const [pageSize, setPageSize] = useState<number>(params.per_page || 10)
  const { data, current_page, last_page, total, status, error } = useSelector(
    (state: RootState) => state.supplierDebtsList
  )

   const { enabled, ...otherParams } = params;
   useEffect(() => {
     if (!enabled) return;
     dispatch(
      fetchSupplierDebts({
         ...otherParams,
         filter,
         enabled: false,
       })
     );
   }, [enabled, filter, dispatch]);
  const loading = status === SupplierDebtsListStatus.LOADING
  const supplierDebtsData: SupplierDebtData[] = data || []
  const totalPages = last_page || 1
  const totalItems = total || 0

  return {
    supplierDebtsData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    current_page,
    totalPages,
    totalItems,
  }
}
