import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplier } from '../../../slices/suppliers/supplier/update/thunk'
import { SuppliersUpdatePayload } from '../../../types/suppliers/supplier/update'

export function useSupplierUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.suppliersUpdate)

  const updateExistingSupplier = useCallback(
    async (payload: SuppliersUpdatePayload) => {
      const resultAction = await dispatch(updateSupplier(payload))
      if (updateSupplier.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplier: data, status, error, updateExistingSupplier }
}
