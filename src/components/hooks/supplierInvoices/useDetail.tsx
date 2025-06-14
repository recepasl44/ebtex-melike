import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchSupplierInvoice } from '../../../slices/supplierInvoices/detail/thunk'

export function useSupplierInvoicesDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierInvoicesDetail)

  const getSupplierInvoice = useCallback(
    async (payload: { supplierId: number; supplierInvoiceId: number }) => {
      const resultAction = await dispatch(fetchSupplierInvoice(payload))
      if (fetchSupplierInvoice.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { supplierInvoice: data, status, error, getSupplierInvoice }
}
