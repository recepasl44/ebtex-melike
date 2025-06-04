import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteSupplierInvoice } from '../../../slices/supplierInvoices/delete/thunk'

export function useSupplierInvoicesDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierInvoicesDelete)

  const deleteExistingSupplierInvoice = useCallback(
    async (payload: { supplierId: number; supplierInvoiceId: number }) => {
      const resultAction = await dispatch(deleteSupplierInvoice(payload))
      if (deleteSupplierInvoice.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedSupplierInvoice: data, status, error, deleteExistingSupplierInvoice }
}
