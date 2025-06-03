import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteStudentGroup } from '../../../slices/studentGroup/delete/thunk'

export function useStudentGroupDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.studentGroupDelete)

    const deleteExistingStudentGroup = useCallback(
        async (studentGroupId: number) => {
            const resultAction = await dispatch(deleteStudentGroup(studentGroupId))
            if (deleteStudentGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedStudentGroup: data, status, error, deleteExistingStudentGroup }
}
