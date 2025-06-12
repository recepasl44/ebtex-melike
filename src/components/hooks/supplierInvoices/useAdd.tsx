import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addSupplierInvoice } from '../../../slices/supplierInvoices/add/thunk'
import { SupplierInvoicesAddPayload } from '../../../types/supplierInvoices/add'

export function useSupplierInvoicesAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierInvoicesAdd)

  const addNewSupplierInvoice = useCallback(
    async (payload: SupplierInvoicesAddPayload) => {
      const resultAction = await dispatch(addSupplierInvoice(payload))
      if (addSupplierInvoice.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedSupplierInvoice: data, status, error, addNewSupplierInvoice }
}
