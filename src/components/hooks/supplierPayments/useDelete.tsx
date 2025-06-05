import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteSupplierPayment } from '../../../slices/supplierPayments/delete/thunk'

export function useSupplierPaymentsDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierPaymentsDelete)

  const deleteExistingSupplierPayment = useCallback(
    async (payload: { supplierId: number; supplierPaymentId: number }) => {
      const resultAction = await dispatch(deleteSupplierPayment(payload))
      if (deleteSupplierPayment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedSupplierPayment: data, status, error, deleteExistingSupplierPayment }
}
