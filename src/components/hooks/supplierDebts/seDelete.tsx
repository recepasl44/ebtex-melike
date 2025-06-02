import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteSupplierDebt } from '../../../slices/supplierDebts/delete/thunk'

export function useSupplierDebtsDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierDebtsDelete)

  const deleteExistingSupplierDebt = useCallback(
    async (payload: { supplierId: number; supplierDebtId: number }) => {
      const resultAction = await dispatch(deleteSupplierDebt(payload))
      if (deleteSupplierDebt.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedSupplierDebt: data, status, error, deleteExistingSupplierDebt }
}
