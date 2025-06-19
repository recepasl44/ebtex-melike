import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteAssignment } from '../../../slices/assignments/delete/thunk'

export function useAssignmentDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.assignmentsDelete)

    const deleteExistingAssignment = useCallback(
        async (assignmentId: number) => {
            const resultAction = await dispatch(deleteAssignment(assignmentId))
            if (deleteAssignment.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedAssignment: data, status, error, deleteExistingAssignment }
}
