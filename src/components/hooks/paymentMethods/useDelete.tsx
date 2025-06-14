import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deletePaymentMethod } from '../../../slices/paymentMethods/delete/thunk'

export function usePaymentMethodDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.paymentMethodsDelete)

  const deleteExistingPaymentMethod = useCallback(
    async (paymentMethodId: number) => {
      const resultAction = await dispatch(deletePaymentMethod(paymentMethodId))
      if (deletePaymentMethod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedPaymentMethod: data, status, error, deleteExistingPaymentMethod }
}
