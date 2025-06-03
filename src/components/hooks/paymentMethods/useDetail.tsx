import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchPaymentMethod } from '../../../slices/paymentMethods/detail/thunk'

export function usePaymentMethodDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.paymentMethodDetail)

  const getPaymentMethod = useCallback(
    async (paymentMethodId: number) => {
      const resultAction = await dispatch(fetchPaymentMethod(paymentMethodId))
      if (fetchPaymentMethod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { paymentMethod: data, status, error, getPaymentMethod }
}
