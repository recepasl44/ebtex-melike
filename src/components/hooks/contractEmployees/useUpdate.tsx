import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateContractEmployee } from '../../../slices/contractEmployees/update/thunk'
import { ContractEmployeesUpdatePayload } from '../../../types/contractEmployees/update'

export function useContractEmployeeUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.contractEmployeeUpdate)

  const updateExistingContractEmployee = useCallback(async (payload: ContractEmployeesUpdatePayload) => {
    const resultAction = await dispatch(updateContractEmployee(payload))
    if (updateContractEmployee.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { updatedContractEmployee: data, status, error, updateExistingContractEmployee }
}
