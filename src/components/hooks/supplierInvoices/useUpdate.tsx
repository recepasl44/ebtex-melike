import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplierInvoice } from '../../../slices/supplierInvoices/update/thunk'
import { SupplierInvoicesUpdatePayload } from '../../../types/supplierInvoices/update'

export function useSupplierInvoicesUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierInvoicesUpdate)

  const updateExistingSupplierInvoice = useCallback(
    async (payload: SupplierInvoicesUpdatePayload) => {
      const resultAction = await dispatch(updateSupplierInvoice(payload))
      if (updateSupplierInvoice.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplierInvoice: data, status, error, updateExistingSupplierInvoice }
}
