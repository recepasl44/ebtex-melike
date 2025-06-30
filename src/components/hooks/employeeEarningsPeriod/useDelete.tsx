import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteEmployeeEarningsPeriod } from '../../../slices/employeeEarningsPeriod/delete/thunk'

export function useEmployeeEarningsPeriodDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsPeriodDelete
  )

  const deleteExistingEmployeeEarningsPeriod = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteEmployeeEarningsPeriod(id))
      if (deleteEmployeeEarningsPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedEmployeeEarningsPeriod: data, status, error, deleteExistingEmployeeEarningsPeriod }
}
