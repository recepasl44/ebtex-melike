import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { EnrollmentsListArg } from '../../../types/enrollments/list'
import { fetchEnrollments } from '../../../slices/enrollments/list/thunk'
import { EnrollmentsListStatus } from '../../../enums/enrollments/list'

export function useEnrollmentsList(params: EnrollmentsListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, meta, status, error } = useSelector((state: RootState) => state.enrollmentList)
    const [filter, _setFilter] = useState<any>(null);


    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchEnrollments({
                ...otherParams,
                filter,
                enabled: false,
            })
        );
    }, [enabled, filter, dispatch, otherParams.student_id]);

  const loading = status === EnrollmentsListStatus.LOADING
  return {
    data,
    enrollmentsData: data || [],
    meta,
    loading,
    status,
    error,
  }
}
