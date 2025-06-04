import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchEnrollment } from '../../../slices/enrollments/detail/thunk'

export function useEnrollmentDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.enrollmentDetail)

  const getEnrollment = useCallback(
    async (enrollmentId: number) => {
      const resultAction = await dispatch(fetchEnrollment(enrollmentId))
      if (fetchEnrollment.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { enrollment: data, status, error, getEnrollment }
}
