import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateEmployeePayment } from '../../../slices/employeePayments/update/thunk'
import { EmployeePaymentUpdatePayload } from '../../../types/employeePayments/update'

export function useEmployeePaymentUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeePaymentUpdate)

  const updateExistingEmployeePayment = useCallback(async (payload: EmployeePaymentUpdatePayload) => {
    const resultAction = await dispatch(updateEmployeePayment(payload))
    if (updateEmployeePayment.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { updatedEmployeePayment: data, status, error, updateExistingEmployeePayment }
}
