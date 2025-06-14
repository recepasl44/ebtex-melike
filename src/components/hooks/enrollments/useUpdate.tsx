import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateEnrollment } from '../../../slices/enrollments/update/thunk'
import { EnrollmentUpdatePayload } from '../../../types/enrollments/update'

export function useEnrollmentUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.enrollmentUpdate)

  const updateExistingEnrollment = useCallback(
    async (payload: EnrollmentUpdatePayload) => {
      const resultAction = await dispatch(updateEnrollment(payload))
      if (updateEnrollment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedEnrollment: data, status, error, updateExistingEnrollment }
}
