import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addPaymentMethod } from '../../../slices/paymentMethods/add/thunk'
import { PaymentMethodAddPayload } from '../../../types/paymentMethods/add'

export function usePaymentMethodAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.paymentMethodAdd)

  const addNewPaymentMethod = useCallback(
    async (payload: PaymentMethodAddPayload) => {
      const resultAction = await dispatch(addPaymentMethod(payload))
      if (addPaymentMethod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedPaymentMethod: data, status, error, addNewPaymentMethod }
}
