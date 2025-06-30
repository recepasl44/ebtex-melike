import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addEmployeeEarningsPeriod } from '../../../slices/employeeEarningsPeriod/add/thunk'
import { EmployeeEarningsPeriodAddPayload } from '../../../types/employeeEarningsPeriod/add'

export function useEmployeeEarningsPeriodAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsPeriodAdd
  )

  const addNewEmployeeEarningsPeriod = useCallback(
    async (payload: EmployeeEarningsPeriodAddPayload) => {
      const resultAction = await dispatch(addEmployeeEarningsPeriod(payload))
      if (addEmployeeEarningsPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedEmployeeEarningsPeriod: data, status, error, addNewEmployeeEarningsPeriod }
}
