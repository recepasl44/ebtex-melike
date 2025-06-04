import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateAssignment } from '../../../slices/assignments/update/thunk'
import { AssignmentsUpdatePayload } from '../../../types/assignments/update'

export function useAssignmentUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.assignmentsUpdate)

    const updateExistingAssignment = useCallback(
        async (payload: AssignmentsUpdatePayload) => {
            const resultAction = await dispatch(updateAssignment(payload))
            if (updateAssignment.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedAssignment: data, status, error, updateExistingAssignment }
}
