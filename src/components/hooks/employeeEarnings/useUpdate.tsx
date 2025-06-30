import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateEmployeeEarning } from '../../../slices/employeeEarnings/update/thunk'
import { EmployeeEarningsUpdatePayload } from '../../../types/employeeEarnings/update'

export function useEmployeeEarningUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeeEarningUpdate)

  const updateExistingEmployeeEarning = useCallback(async (payload: EmployeeEarningsUpdatePayload) => {
    const resultAction = await dispatch(updateEmployeeEarning(payload))
    if (updateEmployeeEarning.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { updatedEmployeeEarning: data, status, error, updateExistingEmployeeEarning }
}
