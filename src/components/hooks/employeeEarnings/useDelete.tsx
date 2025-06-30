import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteEmployeeEarning } from '../../../slices/employeeEarnings/delete/thunk'

export function useEmployeeEarningDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.employeeEarningDelete)

  const deleteExistingEmployeeEarning = useCallback(async (employeeId: number) => {
    const resultAction = await dispatch(deleteEmployeeEarning(employeeId))
    if (deleteEmployeeEarning.fulfilled.match(resultAction)) {
      return resultAction.payload
    }
    return null
  }, [dispatch])

  return { deletedEmployeeEarning: data, status, error, deleteExistingEmployeeEarning }
}
