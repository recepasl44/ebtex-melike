import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteSupplierRefund } from '../../../slices/supplierRefunds/delete/thunk'

export function useSupplierRefundsDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierRefundsDelete)

  const deleteExistingSupplierRefund = useCallback(
    async (payload: { supplierId: number; supplierRefundId: number }) => {
      const resultAction = await dispatch(deleteSupplierRefund(payload))
      if (deleteSupplierRefund.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedSupplierRefund: data, status, error, deleteExistingSupplierRefund }
}
