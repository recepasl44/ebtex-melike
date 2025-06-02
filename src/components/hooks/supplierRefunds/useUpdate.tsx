import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplierRefund } from '../../../slices/supplierRefunds/update/thunk'
import { SupplierRefundsUpdatePayload } from '../../../types/supplierRefunds/update'

export function useSupplierRefundsUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierRefundsUpdate)

  const updateExistingSupplierRefund = useCallback(
    async (payload: SupplierRefundsUpdatePayload) => {
      const resultAction = await dispatch(updateSupplierRefund(payload))
      if (updateSupplierRefund.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplierRefund: data, status, error, updateExistingSupplierRefund }
}
