import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updatePaymentMethod } from '../../../slices/paymentMethods/update/thunk'
import { PaymentMethodUpdatePayload } from '../../../types/paymentMethods/update'

export function usePaymentMethodUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.paymentMethodsUpdate)

  const updateExistingPaymentMethod = useCallback(
    async (payload: PaymentMethodUpdatePayload) => {
      const resultAction = await dispatch(updatePaymentMethod(payload))
      if (updatePaymentMethod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedPaymentMethod: data, status, error, updateExistingPaymentMethod }
}
