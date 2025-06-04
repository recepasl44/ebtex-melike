import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchStudentGroup } from '../../../slices/studentGroup/detail/thunk'

export function useStudentGroupDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.studentGroupDetail)

    const getStudentGroup = useCallback(async (studentGroupId: number) => {
        const resultAction = await dispatch(fetchStudentGroup(studentGroupId))
        if (fetchStudentGroup.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { studentGroup: data, status, error, getStudentGroup }
}
