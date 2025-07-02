import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addEmployeePayment } from '../../../slices/employeePayments/add/thunk'
import { EmployeePaymentAddPayload } from '../../../types/employeePayments/add'

export function useEmployeePaymentAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeePaymentAdd)

  const addNewEmployeePayment = useCallback(async (payload: EmployeePaymentAddPayload) => {
    const resultAction = await dispatch(addEmployeePayment(payload))
    if (addEmployeePayment.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { addedEmployeePayment: data, status, error, addNewEmployeePayment }
}
