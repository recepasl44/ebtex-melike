import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplierPayment } from '../../../slices/supplierPayments/update/thunk'
import { SupplierPaymentsUpdatePayload } from '../../../types/supplierPayments/update'

export function useSupplierPaymentsUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierPaymentsUpdate)

  const updateExistingSupplierPayment = useCallback(
    async (payload: SupplierPaymentsUpdatePayload) => {
      const resultAction = await dispatch(updateSupplierPayment(payload))
      if (updateSupplierPayment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplierPayment: data, status, error, updateExistingSupplierPayment }
}
