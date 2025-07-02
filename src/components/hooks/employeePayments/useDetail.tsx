import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchEmployeePayment } from '../../../slices/employeePayments/detail/thunk'

export function useEmployeePaymentShow() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeePaymentShow)

  const getEmployeePayment = useCallback(async (id: number) => {
    const resultAction = await dispatch(fetchEmployeePayment(id))
    if (fetchEmployeePayment.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { employeePayment: data, status, error, getEmployeePayment }
}
