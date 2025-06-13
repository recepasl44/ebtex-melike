import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplierDebt } from '../../../slices/supplierDebts/update/thunk'
import { SupplierDebtsUpdatePayload } from '../../../types/supplierDebts/update'

export function useSupplierDebtsUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierDebtsUpdate)

  const updateExistingSupplierDebt = useCallback(
    async (payload: SupplierDebtsUpdatePayload) => {
      const resultAction = await dispatch(updateSupplierDebt(payload))
      if (updateSupplierDebt.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplierDebt: data, status, error, updateExistingSupplierDebt }
}
