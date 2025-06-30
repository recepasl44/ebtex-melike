import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addEmployeeEarning } from '../../../slices/employeeEarnings/add/thunk'
import { EmployeeEarningsAddPayload } from '../../../types/employeeEarnings/add'

export function useEmployeeEarningAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeeEarningAdd)

  const addNewEmployeeEarning = useCallback(async (payload: EmployeeEarningsAddPayload) => {
    const resultAction = await dispatch(addEmployeeEarning(payload))
    if (addEmployeeEarning.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { addedEmployeeEarning: data, status, error, addNewEmployeeEarning }
}
