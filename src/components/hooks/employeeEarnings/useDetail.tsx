import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchEmployeeEarning } from '../../../slices/employeeEarnings/detail/thunk'

export function useEmployeeEarningShow() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeeEarningShow)

  const getEmployeeEarning = useCallback(async (employeeId: number) => {
    const resultAction = await dispatch(fetchEmployeeEarning(employeeId))
    if (fetchEmployeeEarning.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { employeeEarning: data, status, error, getEmployeeEarning }
}
