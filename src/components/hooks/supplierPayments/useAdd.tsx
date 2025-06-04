import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addSupplierPayment } from '../../../slices/supplierPayments/add/thunk'
import { SupplierPaymentsAddPayload } from '../../../types/supplierPayments/add'

export function useSupplierPaymentsAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierPaymentsAdd)

  const addNewSupplierPayment = useCallback(
    async (payload: SupplierPaymentsAddPayload) => {
      const resultAction = await dispatch(addSupplierPayment(payload))
      if (addSupplierPayment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedSupplierPayment: data, status, error, addNewSupplierPayment }
}
