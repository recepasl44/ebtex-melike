import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addEnrollment } from '../../../slices/enrollments/add/thunk'
import { EnrollmentAddPayload } from '../../../types/enrollments/add'

export function useEnrollmentAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.enrollmentAdd)

  const addNewEnrollment = useCallback(
    async (payload: EnrollmentAddPayload) => {
      const resultAction = await dispatch(addEnrollment(payload))
      if (addEnrollment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedEnrollment: data, status, error, addNewEnrollment }
}
