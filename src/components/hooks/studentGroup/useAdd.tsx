import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addStudentGroup } from '../../../slices/studentGroup/add/thunk'
import { StudentGroupsAddPayload } from '../../../types/studentGroup/add'

export function useStudentGroupAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.studentGroupAdd)

    const addNewStudentGroup = useCallback(
        async (payload: StudentGroupsAddPayload) => {
            const resultAction = await dispatch(addStudentGroup(payload))
            if (addStudentGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedStudentGroup: data, status, error, addNewStudentGroup }
}
