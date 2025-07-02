import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteEmployeePayment } from '../../../slices/employeePayments/delete/thunk'

export function useEmployeePaymentDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeePaymentDelete)

  const deleteExistingEmployeePayment = useCallback(async (id: number) => {
    const resultAction = await dispatch(deleteEmployeePayment(id))
    if (deleteEmployeePayment.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { deletedEmployeePayment: data, status, error, deleteExistingEmployeePayment }
}
