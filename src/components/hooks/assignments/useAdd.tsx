import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addAssignment } from '../../../slices/assignments/add/thunk'
import { AssignmentsAddPayload } from '../../../types/assignments/add'

export function useAssignmentAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.assignmentsAdd)

    const addNewAssignment = useCallback(
        async (payload: AssignmentsAddPayload) => {
            const resultAction = await dispatch(addAssignment(payload))
            if (addAssignment.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedAssignment: data, status, error, addNewAssignment }
}
