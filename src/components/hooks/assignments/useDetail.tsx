import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAssignment } from '../../../slices/assignments/detail/thunk'

export function useAssignmentDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.assignmentsDetail)

    const getAssignment = useCallback(
        async (assignmentId: number) => {
            const resultAction = await dispatch(fetchAssignment(assignmentId))
            if (fetchAssignment.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { assignment: data, status, error, getAssignment }
}
