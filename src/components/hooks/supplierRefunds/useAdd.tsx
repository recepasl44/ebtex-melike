import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addSupplierRefund } from '../../../slices/supplierRefunds/add/thunk'
import { SupplierRefundsAddPayload } from '../../../types/supplierRefunds/add'

export function useSupplierRefundsAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierRefundsAdd)

  const addNewSupplierRefund = useCallback(
    async (payload: SupplierRefundsAddPayload) => {
      const resultAction = await dispatch(addSupplierRefund(payload))
      if (addSupplierRefund.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedSupplierRefund: data, status, error, addNewSupplierRefund }
}
