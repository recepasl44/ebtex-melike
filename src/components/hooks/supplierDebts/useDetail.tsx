import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchSupplierDebt } from '../../../slices/supplierDebts/detail/thunk'

export function useSupplierDebtsDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierDebtsDetail)

  const getSupplierDebt = useCallback(
    async (payload: { supplierId: number; supplierDebtId: number }) => {
      const resultAction = await dispatch(fetchSupplierDebt(payload))
      if (fetchSupplierDebt.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { supplierDebt: data, status, error, getSupplierDebt }
}
