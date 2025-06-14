import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchSupplierPayment } from '../../../slices/supplierPayments/detail/thunk'

export function useSupplierPaymentsDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierPaymentsDetail)

  const getSupplierPayment = useCallback(
    async (payload: { supplierId: number; supplierPaymentId: number }) => {
      const resultAction = await dispatch(fetchSupplierPayment(payload))
      if (fetchSupplierPayment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { supplierPayment: data, status, error, getSupplierPayment }
}
