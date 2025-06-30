import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addContractEmployee } from '../../../slices/contractEmployees/add/thunk'
import { ContractEmployeesAddPayload } from '../../../types/contractEmployees/add'

export function useContractEmployeeAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.contractEmployeeAdd)

  const addNewContractEmployee = useCallback(async (payload: ContractEmployeesAddPayload) => {
    const resultAction = await dispatch(addContractEmployee(payload))
    if (addContractEmployee.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { addedContractEmployee: data, status, error, addNewContractEmployee }
}
