import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteContractEmployee } from '../../../slices/contractEmployees/delete/thunk'

export function useContractEmployeeDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.contractEmployeeDelete)

  const deleteExistingContractEmployee = useCallback(async (employeeId: number) => {
    const resultAction = await dispatch(deleteContractEmployee(employeeId))
    if (deleteContractEmployee.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { deletedContractEmployee: data, status, error, deleteExistingContractEmployee }
}
