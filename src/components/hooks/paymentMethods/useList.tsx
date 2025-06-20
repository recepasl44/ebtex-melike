import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchPaymentMethods } from '../../../slices/paymentMethods/list/thunk'
import { PaymentMethodsListArg } from '../../../types/paymentMethods/list'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'

export function usePaymentMethodsList(params: PaymentMethodsListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.paymentMethodsList
  )

  const { enabled = true, ...filters } = params

  useEffect(() => {
    if (enabled === false) return
    dispatch(fetchPaymentMethods({ enabled, ...filters }))
  }, [
    dispatch,
    enabled,
    JSON.stringify(filters)
  ])

  const loading = status === PaymentMethodsListStatus.LOADING
  return {
    paymentMethodsData: data || [],
    meta,
    data,
    loading,
    error,
  }
}
