import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchEmployeeEarningsPeriod } from '../../../slices/employeeEarningsPeriod/detail/thunk'

export function useEmployeeEarningsPeriodShow() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsPeriodShow
  )

  const getEmployeeEarningsPeriod = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(fetchEmployeeEarningsPeriod(id))
      if (fetchEmployeeEarningsPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { employeeEarningsPeriod: data, status, error, getEmployeeEarningsPeriod }
}
