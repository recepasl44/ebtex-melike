import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteEnrollment } from '../../../slices/enrollments/delete/thunk'

export function useEnrollmentDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.enrollmentDelete)

  const deleteExistingEnrollment = useCallback(
    async (enrollmentId: number) => {
      const resultAction = await dispatch(deleteEnrollment(enrollmentId))
      if (deleteEnrollment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedEnrollment: data, status, error, deleteExistingEnrollment }
}
