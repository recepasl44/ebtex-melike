import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateStudentGroup } from '../../../slices/studentGroup/update/thunk'
import { StudentGroupsUpdatePayload } from '../../../types/studentGroup/update'

export function useStudentGroupUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.studentGroupUpdate)

    const updateExistingStudentGroup = useCallback(
        async (payload: StudentGroupsUpdatePayload) => {
            const resultAction = await dispatch(updateStudentGroup(payload))
            if (updateStudentGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedStudentGroup: data, status, error, updateExistingStudentGroup }
}
