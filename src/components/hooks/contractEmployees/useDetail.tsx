import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchContractEmployee } from '../../../slices/contractEmployees/detail/thunk'

export function useContractEmployeeShow() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.contractEmployeeShow)

  const getContractEmployee = useCallback(async (employeeId: number) => {
    const resultAction = await dispatch(fetchContractEmployee(employeeId))
    if (fetchContractEmployee.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { contractEmployee: data, status, error, getContractEmployee }
}
