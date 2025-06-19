import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchSupplierRefund } from '../../../slices/supplierRefunds/detail/thunk'

export function useSupplierRefundsDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierRefundsDetail)

  const getSupplierRefund = useCallback(
    async (payload: { supplierId: number; supplierRefundId: number }) => {
      const resultAction = await dispatch(fetchSupplierRefund(payload))
      if (fetchSupplierRefund.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { supplierRefund: data, status, error, getSupplierRefund }
}
