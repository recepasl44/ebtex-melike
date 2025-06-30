import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateEmployeeEarningsPeriod } from '../../../slices/employeeEarningsPeriod/update/thunk'
import { EmployeeEarningsPeriodUpdatePayload } from '../../../types/employeeEarningsPeriod/update'

export function useEmployeeEarningsPeriodUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsPeriodUpdate
  )

  const updateExistingEmployeeEarningsPeriod = useCallback(
    async (payload: EmployeeEarningsPeriodUpdatePayload) => {
      const resultAction = await dispatch(updateEmployeeEarningsPeriod(payload))
      if (updateEmployeeEarningsPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedEmployeeEarningsPeriod: data, status, error, updateExistingEmployeeEarningsPeriod }
}
